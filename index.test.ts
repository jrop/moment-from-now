import { describe, expect, it } from "bun:test";

import fromNow from "./index";

describe("fromNow()", () => {
  it("now", () => expect(fromNow(new Date())).toEqual("now"));
  it("now (499ms)", () =>
    expect(fromNow(new Date().getTime() + 499)).toEqual("now"));
  it("now (-499ms)", () =>
    expect(fromNow(new Date().getTime() - 499)).toEqual("now"));
  it("1 second (501ms)", () =>
    expect(fromNow(new Date().getTime() + 501)).toEqual("1 second"));
  it("1 second ago (501ms)", () =>
    expect(fromNow(new Date().getTime() - 501)).toEqual("1 second ago"));
  it("30 seconds", () =>
    expect(fromNow(new Date().getTime() + 30 * 1000)).toEqual("30 seconds"));
  it("30 seconds ago", () =>
    expect(fromNow(new Date().getTime() - 30 * 1000)).toEqual(
      "30 seconds ago",
    ));
  it("1 minute", () =>
    expect(fromNow(new Date().getTime() + 50 * 1000)).toEqual("1 minute"));
  it("1 hour", () =>
    expect(fromNow(new Date().getTime() + 46 * 60 * 1000)).toEqual("1 hour"));
  it("1 day", () =>
    expect(fromNow(new Date().getTime() + 23 * 60 * 60 * 1000)).toEqual(
      "1 day",
    ));
  it("1 month", () =>
    expect(fromNow(new Date().getTime() + 27 * 24 * 60 * 60 * 1000)).toEqual(
      "1 month",
    ));
  it("1 year", () =>
    expect(fromNow(new Date().getTime() + 364 * 24 * 60 * 60 * 1000)).toEqual(
      "1 year",
    ));
});
