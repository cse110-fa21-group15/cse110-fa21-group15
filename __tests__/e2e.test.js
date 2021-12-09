const puppeteer = require("puppeteer");

(async () => {
    let page = await browser.newPage();
});

describe("Basic user flow for website", () => {
    beforeAll(async () => {
        await page.goto('https://festive-minsky-ab51a6.netlify.app/source/signin');
    }, 10000);

    // it("Checking email bar placeholder value ", async () => {
    //     const ebar = await page.$eval("#email", (e) => e.placeholder);
    //     expect(ebar).toBe("Email");
    // });

    // it("Checking password bar placeholder value", async () => {
    //     const pbar = await page.$eval("#password", (e) => e.placeholder);
    //     expect(pbar).toBe("Password");
    // });

    // it("checking if checking if incorrect username and password results in error", async () => {
    //     const browser = await puppeteer.launch({
    //         headless:false,
    //         slowMo:100
    //     });
    //     const page = await browser.newPage();
    //     await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
    //     const ebar = await page.$eval("#email", (e) => e.value = "likithpala7@gmail.com");
    //     const pbar = await page.$eval("#password", (e) => e.value = "asdasdasd");
    //     const button = await page.$("#lbutton");
    //     await button.click();
    //     // console.log("here2");
    //     let error = await page.$eval("#invalidLogin", (e) => e.innerHTML);
    //     // console.log("here1");
    //     // console.log(error);
    //     await browser.close();
    //     expect(error).toBe("Invalid Log In");
    // }, 10000);

    // it("checking if login works properly", async () => {
    //     const browser = await puppeteer.launch({
    //         headless:false,
    //         slowMo:50
    //     });
    //     const page = await browser.newPage();
    //     await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
    //     const ebar = await page.$eval("#email", (e) => e.value = "bruh@gmail.com");
    //     const pbar = await page.$eval("#password", (e) => e.value = "testpassword");
    //     const button = await page.$("#lbutton");
    //     await button.click();
    //     await page.waitForNavigation();
    //     const sbar = await page.$eval("#signedIn", (e) => e.innerHTML);
    //     await browser.close();
    //     expect(sbar).toBe("Sign Out");
    //     await browser.close();
    // }, 10000);

    // it("checking if all the dropdown elements are present", async () => {
    //     const browser = await puppeteer.launch({
    //         headless:false,
    //          defaultViewport: {
    //              width:1920,
    //              height:1080
    //          }

    //     });
    //     const page = await browser.newPage();
    //     await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
    //     const ebar = await page.$eval("#email", (e) => e.value = "bruh@gmail.com");
    //     const pbar = await page.$eval("#password", (e) => e.value = "testpassword");
    //     const button = await page.$("#lbutton");
    //     await button.click();
    //     await page.waitForNavigation();
    //     const ddlist = await page.$$("option");
    //     await browser.close();
    //     expect(ddlist.length).toBe(16);
    // }, 10000);

    // it("checking if creating recipes works", async () => {
    //     const browser = await puppeteer.launch({
    //         slowMo:100,
    //         headless:false,
    //         defaultViewport: {
    //             width:1280,
    //             height:720
    //         }
    //     });
    //     const page = await browser.newPage();
    //     await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
    //     const ebar = await page.$eval("#email", (e) => e.value = "bruh@gmail.com");
    //     const pbar = await page.$eval("#password", (e) => e.value = "testpassword");
    //     const button = await page.$("#lbutton");
    //     await button.click();
    //     await page.waitForNavigation();
    //     const drop = await page.$("button");
    //     await drop.click();
    //     const crecipe = await page.$("#recipeUpload");
    //     await crecipe.click();
    //     await page.waitForNavigation();
    //     const input = await page.$eval(".recipeNameText", (e) => e.value = "Omelette");
    //     const uploader = await page.$("#imageUpload");
    //     await uploader.uploadFile("/Users/likithpala/Documents/GitHub/cse110-fa21-group15/__tests__/img.jpeg");

    //     const time = await page.$eval(".timeBoxInput", (e) => e.value = "10 mins");
    //     const cost = await page.$eval(".costBoxInput", (e) => e.value = "$5");
    //     const size = await page.$eval(".servingsBoxInput", (e) => e.value = "1 serving");
    //     const desc = await page.$eval("#descriptionBoxInput", (e) => e.value = "How to make a breakfast omelette!");
    //     const ings = await page.$eval("#ingredientsBoxInput", (e) => e.value = "eggs, chili powder, salt, oil");
    //     const steps = await page.$eval("#stepsBoxInput", (e) => e.value = "beat egg in bowl, add chili powder, add salt, add oil to a heated pan, pour egg mixture into the pan");

    //     const click = await page.$eval(".btTxt", (e) => e.click());
    //     await page.waitForNavigation();
    //     await browser.close();
    //     expect(page.url()).toBe("https://festive-minsky-ab51a6.netlify.app/source/cookbook.html");
    // }, 100000);

    it("checking if searching for recipe works", async () => {
        const browser = await puppeteer.launch({
            slowMo:150,
            headless:false,
            defaultViewport: {
                width:1920,
                height:1080
            }
        });
        const page = await browser.newPage();
        await page.goto("http://127.0.0.1:5501/source/signin.html");
        const ebar = await page.$eval("#email", (e) => e.value = "bruh@gmail.com");
        const pbar = await page.$eval("#password", (e) => e.value = "testpassword");
        let button = await page.$("#lbutton");
        await button.click();
        await page.waitForNavigation();
        expect(page.url()).toBe("http://127.0.0.1:5501/source/homepage.html");
        page.goto("http://127.0.0.1:5501/source/cookbook.html");
        // const sbar = await page.$eval(".round", (e) => e.value = "chicken");
        // button = await page.$(".fa");
        // await button.click();
        // await page.waitForNavigation();
        // expect(page.url()).toBe("http://127.0.0.1:5501/source/searchresults.html");
        // const recipes = await page.$$("recipe-card");
        // expect(recipes.length).toBe(14);
        // for (let i = 0; i < recipes.length; i++) {
        //     const shadow = await recipes[i].getProperty("shadowRoot");
        //     const time1 = await shadow.$eval(".time", (e) => e.textContent);
        //     console.log(time1);
        // }
        // const recipe = recipes[0];
        // await recipe.click();
        // await page.waitForNavigation();
        // const name = await page.$eval(".name", (e) => e.textContent);
        // console.log(name);
        // const add = await page.$eval(".icon", (e) => e.click());
        await page.waitForNavigation();
        console.log(page.url());
        const recipes = await page.$$eval("recipe-card");
        // const root = await page.evaluate(() => document.body.querySelector("main"));
        console.log(recipes);
        // expect(check).toBe(name);
        
        await browser.close();
    }, 100000);

});
