import { Observable } from "../Observable";

describe("Observable", () => {
  it("can store event in events", () => {
    const observable = new Observable();
    observable.on("update", () => {});
    expect(observable.eventsLength).toBe(1);
  });

  it("can tirgger events", () => {
    const observable = new Observable();
    const fn = jest.fn();
    observable.on("update", fn);
    observable.trigger("update");
    expect(fn).toHaveBeenCalled();
  });
});
