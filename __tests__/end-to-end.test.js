const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
})

describe("Test Signup and Login", () => {
    beforeAll(async () => {
        await page.goto('https://festive-minsky-ab51a6.netlify.app/source/signin');
    }, 10000);

    it("Checking email bar placeholder value ", async () => {
        const ebar = await page.$eval("#email", (e) => e.placeholder);
        expect(ebar).toBe("Email");
    });

    it("Checking password bar placeholder value", async () => {
        const pbar = await page.$eval("#password", (e) => e.placeholder);
        expect(pbar).toBe("Password");
    });


});