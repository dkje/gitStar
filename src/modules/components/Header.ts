import { TopBarView } from "../views/TopBarView";
import { Component } from "./Component";
import { Menu } from "./states/Menu";

// TopBar View를 관리하는 Components
export class Header implements Component {
  constructor(private state: Menu) {}

  #topBar = new TopBarView(document.querySelector(".top-bar")!, this.state);

  render = () => {
    this.#topBar.render();
  };
}
