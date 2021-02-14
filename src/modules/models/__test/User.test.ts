import { User } from "../User";

describe("User", () => {
  it("can create user instance with attrs", () => {
    const user = User.buildUser({
      id: "exampleId",
      avatar_url: "exampleUrl",
      login: "asd",
    });

    expect(user.get("id")).toEqual("exampleId");
  });

  it("can careate User Collection", () => {
    const users = User.buildUserCollection();
    expect(users.models).toHaveLength(0);
  });

  it("Collection can fetch UserList from git user search api", async () => {
    const users = User.buildUserCollection();
    await users.searchUser("a");
    expect(users.models.length).toBeGreaterThan(0);
  });

  it("create singleton Collection instance", async () => {
    const users = User.buildUserCollection();
    await users.searchUser("a");
    const newUsers = User.buildUserCollection();
    expect(newUsers.models.length).toBeGreaterThan(1);
  });
});
