import { handleSubmit } from "../client/js/app";

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
  });
});

describe('Testing if "handleSubmit()" is a valid function', () => {
  test('"handleSubmit() has to be a function', async () => {
    expect(typeof handleSubmit).toBe("function");
  });
});