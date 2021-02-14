import { Bookmark } from "../Bookmark";

beforeEach(() => {
  localStorage.clear();
});

describe("Bookmark", () => {
  it("can create instance with attrs", () => {
    const bookmark = Bookmark.buildBookmark({ id: "testId", bookmarked: true });
    expect(bookmark.get("id")).toEqual("testId");
  });

  it("can create Bookmark Collection", () => {
    const bookmarkCollection = Bookmark.buildBookmarkCollection();
    expect(bookmarkCollection.models).toHaveLength(0);
  });

  it("Collection can save new bookmark", () => {
    const bookmarkCollection = Bookmark.buildBookmarkCollection();
    bookmarkCollection.save({ id: "asd", bookmarked: true });
    expect(bookmarkCollection.models).toHaveLength(1);
  });

  it("create singleton Collection instance", () => {
    const bookmarkCollection = Bookmark.buildBookmarkCollection();
    bookmarkCollection.save({ id: "asd", bookmarked: true });
    const newBookmarkCollection = Bookmark.buildBookmarkCollection();
    expect(newBookmarkCollection.models).toHaveLength(1);
  });
});
