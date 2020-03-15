import { formRequiredError, formMaxLengthError, formMinLengthError } from "./formErrorMessages";

describe("formErrorMessages", () => {
  describe("When forming required errors", () => {
    test("should form required error properly for singular field", () => {
      expect(formRequiredError({ field: "Name" })).toBe("Name is required.");
    });

    test("should form required error properly for plural field", () => {
      expect(formRequiredError({ field: "Names", plural: true })).toBe("Names are required.");
    });
  });

  describe("When forming min length errors", () => {
    test("should form min length error properly", () => {
      expect(formMinLengthError({ field: "Email", minLength: 20 })).toBe("Email must be at least 20 characters.");
    });
  });

  describe("When forming max length errors", () => {
    test("should form max length error properly", () => {
      expect(formMaxLengthError({ field: "Username", maxLength: 40 })).toBe("Username must be at most 40 characters.");
    });
  });
});
