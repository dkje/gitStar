import LocalStorage from "../sync/LocalStorage";
import { KorFirstSort } from "../utils/KorFirstSort";
import { Sort } from "../utils/Sort";
import { Bookmark, BookmarkProps } from "./Bookmark";
import { Collection, Desirialize } from "./Collection";
interface UserProps {
  login: string;
  avatar_url: string;
  id: string;
  bookmarked?: boolean;
}

//Bookmark Model을 통해 생성된다
export class BookmarkCollection extends Collection<Bookmark, BookmarkProps> {
  #sync = new LocalStorage("gitStar_bookmark");
  #sorter: Sort = new KorFirstSort("login");

  // 객체 생성 시 기존 localstorage의 데이터를 불러와 model에 보관한다
  constructor(deserialize: Desirialize<Bookmark, BookmarkProps>) {
    super(deserialize);
    this.update();
  }

  // 필요에 따라 다른 sort 로직을 적용할 수 있도록 추상화
  get sort() {
    return () => {
      this.#sorter.sort(this.models);
    };
  }

  // 인자로 전달받은 data를 localstorage에 추가한다
  save = (data: BookmarkProps) => {
    this.#sync.save(data);
    this.update();
  };

  // localstorage에서 꺼낸 데이터를 Model 인스턴스로 mapping해 저장한다
  update = () => {
    const newDatas = this.#sync.get();
    if (!newDatas) return;
    const newDatasArr = JSON.parse(newDatas);
    this.models = newDatasArr.map((data: BookmarkProps) =>
      this.deserialize(data)
    );
    this.sort();
    this.trigger("update");
  };

  // localstorage에서 해당 id를 갖는 객체를 삭제한다
  deleteById = (id: string) => {
    this.#sync.deleteById(id);
    this.update();
  };

  toggle = (data: UserProps) => {
    if (data.bookmarked) {
      return this.deleteById(data.id);
    }
    this.save({ ...data, bookmarked: true });
  };

  findById = (id: string) => {
    return this.models.find((el) => el.get("id") === id);
  };
}
