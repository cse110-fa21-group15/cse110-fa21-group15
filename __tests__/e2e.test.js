const puppeteer = require("puppeteer");

describe("Basic user flow for website", () => {
    beforeAll(async () => {
        let page;
        await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
    }, 10000);

    it("Checking email bar placeholder value ", async () => {
        const ebar = await page.$eval("#email", (e) => e.placeholder);
        expect(ebar).toBe("Email");
    });

    it("Checking password bar placeholder value", async () => {
        const pbar = await page.$eval("#password", (e) => e.placeholder);
        expect(pbar).toBe("Password");
    });

    it("checking if checking if incorrect username and password results in error", async () => {
        const browser = await puppeteer.launch({
            headless:false,
            slowMo:100
        });
        const page = await browser.newPage();
        await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
        const ebar = await page.$eval("#email", (e) => e.value = "likithpala7@gmail.com");
        const pbar = await page.$eval("#password", (e) => e.value = "asdasdasd");
        const button = await page.$("#lbutton");
        await button.click();
        console.log("here2");
        let error = await page.$eval("#invalidLogin", (e) => e.innerHTML);
        console.log("here1");
        console.log(error);
        await browser.close();
        expect(error).toBe("Invalid Log In");
    }, 10000);

    it("checking if login works properly", async () => {
        const browser = await puppeteer.launch({
            headless:false,
            slowMo:50
        });
        const page = await browser.newPage();
        await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
        const ebar = await page.$eval("#email", (e) => e.value = "lpalabin@ucsd.edu");
        const pbar = await page.$eval("#password", (e) => e.value = "Deatheater8+");
        const button = await page.$("#lbutton");
        await button.click();
        await page.waitForNavigation();
        const sbar = await page.$eval("#signedIn", (e) => e.innerHTML);
        await browser.close();
        expect(sbar).toBe("Sign Out");
        await browser.close();
    }, 10000);

    it("checking if all the dropdown elements are present", async () => {
        const browser = await puppeteer.launch({
            headless:false,
        });
        const page = await browser.newPage();
        await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
        const ebar = await page.$eval("#email", (e) => e.value = "lpalabin@ucsd.edu");
        const pbar = await page.$eval("#password", (e) => e.value = "Deatheater8+");
        const button = await page.$("#lbutton");
        await button.click();
        await page.waitForNavigation();
        const ddlist = await page.$$("option");
        await browser.close();
        expect(ddlist.length).toBe(16);
    }, 10000);

    it("checking if creating recipes works", async () => {
        const browser = await puppeteer.launch({
            slowMo:100,
            headless:false,
        });
        const page = await browser.newPage();
        await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
        const ebar = await page.$eval("#email", (e) => e.value = "lpalabin@ucsd.edu");
        const pbar = await page.$eval("#password", (e) => e.value = "Deatheater8+");
        const button = await page.$("#lbutton");
        await button.click();
        await page.waitForNavigation();
        const drop = await page.$("button");
        await drop.click();
        const crecipe = await page.$("#recipeUpload");
        await crecipe.click();
        await page.waitForNavigation();
        const input = await page.$eval(".recipeNameText", (e) => e.value = "Omelette");
        const uploader = await page.$("input[type=file]");
        // uploader.uploadFile("img.jpeg");

        const time = await page.$eval(".timeBoxInput", (e) => e.value = "10 mins");
        const cost = await page.$eval(".costBoxInput", (e) => e.value = "$5");
        const size = await page.$eval(".servingsBoxInput", (e) => e.value = "1 serving");
        const desc = await page.$eval("#descriptionBox", (e) => e.value = "How to make a breakfast omelette!");
        const ings = await page.$eval("#ingredientsBox", (e) => e.value = "eggs, chili powder, salt, oil");
        
        await browser.close();
    }, 100000)
});