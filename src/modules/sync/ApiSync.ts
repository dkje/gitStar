import axios, { AxiosPromise } from "axios";
import { Sync } from "./Sync";

// Api 호출과 관련된 행동 클래스
export class ApiSync<T> implements Sync<T> {
  constructor(public rootUrl: string) {}

  //rootUrl와 파라미터를 기준으로 데이터를 불러온다
  get(param?: string): AxiosPromise {
    return axios.get<T[]>(`${this.rootUrl}${param ? param : ""}`);
  }

  save() {
    throw Error("아직 구현되지 않은 기능");
  }
  deleteById() {
    throw Error("아직 구현되지 않은 기능");
  }
}
