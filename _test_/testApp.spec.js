import { checkURL } from "../src/client/js/nameChecker";

describe("Testing the submit functionality", () => {

  test("Testing the checkForName() function", () => {
    expect(checkURL).toBeDefined();
  });
});

describe('Testing if "checkURL()" is a valid function', () => {
  test('"checkURL() has to be a function', async () => {
    expect(typeof checkURL).toBe("function");
  });
});