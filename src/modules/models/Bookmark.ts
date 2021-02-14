import { Attributes } from "./Attributes";
import { BookmarkCollection } from "./BookmarkCollection";
import { Model } from "./Model";
import { Observable } from "./Observable";

export interface BookmarkProps {
  login?: string;
  avatar_url?: string;
  id: string;
  bookmarked: boolean;
}

// Bookmark 모델을 생성하기 위한 Class
export class Bookmark extends Model<BookmarkProps> {
  static bookmarkCollectionInstance: null | BookmarkCollection = null;

  // 단일 Bookmark Model을 생성한다
  static buildBookmark(attr: BookmarkProps) {
    return new Bookmark(new Attributes(attr), new Observable());
  }

  // buildBookmark를 기반으로 Bookmark Collection을 생성한다
  static buildBookmarkCollection() {
    if (this.bookmarkCollectionInstance) return this.bookmarkCollectionInstance;

    this.bookmarkCollectionInstance = new BookmarkCollection((bookmark) => {
      return this.buildBookmark(bookmark);
    });
    return this.bookmarkCollectionInstance;
  }
}
