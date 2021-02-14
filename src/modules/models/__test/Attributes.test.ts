import { Attributes } from "../Attributes";

interface User {
  name: string;
  age: number;
}

describe("Attributue", () => {
  it("store atguments in data attributes", () => {
    const attr = new Attributes<User>({ name: "kim", age: 12 });
    expect(attr).toHaveProperty("data");
  });

  it("has get method returns a values that has argments as a key ", () => {
    const attr = new Attributes<User>({ name: "kim", age: 12 });
    expect(attr.get("name")).toBe("kim");
  });

  it("has set method update a values with arguments object ", () => {
    const attr = new Attributes<User>({ name: "kim", age: 12 });
    attr.set({ name: "min" });
    expect(attr.get("name")).toBe("min");
  });

  it("has getAll method return a private data attributes", () => {
    const userAttr = { name: "kim", age: 12 };
    const attr = new Attributes<User>(userAttr);
    const user = attr.getAll();
    expect(user).toStrictEqual({ name: "kim", age: 12 });
  });
});
