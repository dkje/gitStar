import LocalStorage from "../LocalStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("LocalStorage", () => {
  it("can get data with key", () => {
    const key = "exampleKey";
    const value = "data";
    localStorage.setItem(key, value);

    const storage = new LocalStorage(key);
    expect(storage.get()).toEqual(value);
  });

  it("can save data with key", () => {
    const key = "exampleKey";
    const value = { id: "2", value: "data" };
    const storage = new LocalStorage(key);
    storage.save(value);

    const storedValue = localStorage.getItem(key);
    expect(storedValue).not.toBeNull();
    expect(JSON.parse(storedValue || "")).toHaveLength(1);
  });

  it("can not save duplicat data", () => {
    const key = "exampleKey";
    const value = { id: "2", value: "data" };
    const storage = new LocalStorage(key);
    storage.save(value);
    storage.save(value);

    const storedValue = localStorage.getItem(key);
    expect(storedValue).not.toBeNull();
    expect(JSON.parse(storedValue || "")).toHaveLength(1);
  });

  it("can delete data with provided id", () => {
    const key = "exampleKey";
    const value = { id: "2", value: "data" };
    const storage = new LocalStorage(key);
    storage.save(value);

    storage.deleteById("2");

    const storedValue = localStorage.getItem(key);
    expect(storedValue).not.toBeNull();
    expect(JSON.parse(storedValue || "")).toHaveLength(0);
  });

  it("can delete all data", () => {
    const key = "exampleKey";
    const value = { id: "2", value: "data" };
    const storage = new LocalStorage(key);
    storage.save(value);

    storage.deleteAll();
    const storedValue = localStorage.getItem(key);
    expect(storedValue).toBeNull();
  });
});
