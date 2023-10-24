import { handleSubmit } from "../client/js/app";

describe('The function "handleSubmit()" should exist' , () => {
    test('It should has no return ', () => {
        expect(handleSubmit).toBeDefined();
    });
});
describe('The function "handleSubmit(event)" should be a function' , () => {
    test('It should be a function', () => {
        expect(typeof handleSubmit).toBe("function");
    });
});