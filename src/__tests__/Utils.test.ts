import { Query } from "../Utils";

describe("Utils", () => {
  describe("Query", () => {
    describe("#parse", () => {
      const tests = [
        {
          input: "foo=bar&hoge=fuga",
          expected: { foo: "bar", "hoge": "fuga" },
        }
      ];
      tests.forEach(({ input, expected }) => {
        it("should pass test", () => {
          expect(Query.parse(input)).toEqual(expected);
        });
      });
    });

    describe("#stringify", () => {
      const tests = [
        {
          input: {},
          expected: "",
        },
        {
          input: {
            foo: "bar"
          },
          expected: "foo=bar"
        },
        {
          input: {
            foo: "bar",
            hoge: "fuga",
          },
          expected: "foo=bar&hoge=fuga"
        }
      ];
      tests.forEach(({ input, expected }) => {
        it("should pass test", () => {
          expect(Query.stringify(input)).toBe(expected);
        });
      });
    });
  });
});
