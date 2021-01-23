import { helloworld } from "../src/helloworld";

describe("テストが動くことの確認", (): void => {
  it("helloworld test", (): void => {
    const res: string = helloworld("guest");
    expect(res).toBe("Hello World! guest!");
  });
});
