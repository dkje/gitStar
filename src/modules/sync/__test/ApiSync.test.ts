import { ApiSync } from "../ApiSync";

describe("ApiSync", () => {
  it("get data from remote storage", async () => {
    const sync = new ApiSync("https://jsonplaceholder.typicode.com/users");
    const response = await sync.get();
    expect(response.data).not.toBeUndefined();
  });
});
