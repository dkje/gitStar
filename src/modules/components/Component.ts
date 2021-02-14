//컴포넌트의 인터페이스
export interface Component {
  bind?(): void;
  render(): void;
}
