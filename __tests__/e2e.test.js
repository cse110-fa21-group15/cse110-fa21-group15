describe('Basic user flow for website', () => {
    beforeAll(async () => {
        await page.goto('https://festive-minsky-ab51a6.netlify.app/source/signin');
    });

    it('Checking email bar placeholder value ', async () => {
        const ebar = await page.$eval("#email", e => e.placeholder);
        expect(ebar).toBe("Email");
      });

      it('Checking password bar placeholder value', async () => {
        const pbar = await page.$eval("#password", e => e.placeholder);
        expect(pbar).toBe("Password");
      });

      it("checking if log in works properly", async () => {
        const ebar = await page.$eval("#email", e => e.value = "likithpala7@gmail.com");
        const pbar = await page.$eval
      });
});