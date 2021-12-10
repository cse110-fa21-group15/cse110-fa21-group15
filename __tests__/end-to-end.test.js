const puppeteer = require("puppeteer");

// (async () => {
//     const browser = await puppeteer.launch();
//     let page = await browser.newPage();
// })

describe("Test Signup and Login", () => {
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

    // it("Checking if incorrect username and password results in error", async () => {
    //     const browser = await puppeteer.launch({
    //         headless:true,
    //         slowMo:100
    //     });
    //     const page = await browser.newPage();
    //     await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
    //     const ebar = await page.$eval("#email", (e) => e.value = "failemail@gmail.com");
    //     const pbar = await page.$eval("#password", (e) => e.value = "asdasdasd");
    //     const button = await page.$("#lbutton");
    //     await button.click();
    //     await page.waitForSelector('#invalidLogin');
    //     let error = await page.$eval("#invalidLogin", (e) => e.innerHTML);
    //      //console.log("here1");
    //      //console.log(error);
    //     await browser.close();
    //     expect(error).toBe("Invalid Log In");
    // }, 10000);

    // it("checking if login works properly", async () => {
    //     const browser = await puppeteer.launch({
    //         headless:true,
    //         slowMo:50,
    //         //executablePath: '/usr/bin/chromium-browser'
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
    //         headless:true,
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
    //     expect(ddlist.length).toBe(15);
    // }, 10000);

    // it("checking if creating recipes works", async () => {
    //     const browser = await puppeteer.launch({
    //         slowMo:50,
    //         headless:true,
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
        
    //     // use if locally testing
    //     //await uploader.uploadFile("/Users/padun/Desktop/CSE 110/Team/cse110-fa21-group15/__tests__/img.jpeg");
        
    //     // use for ci/cd deployment
    //     await uploader.uploadFile("/home/runner/work/cse110-fa21-group15/cse110-fa21-group15/__tests__/img.jpeg");

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
    // }, 10000);

    it("checking if searching for recipe works", async () => {
        const browser = await puppeteer.launch({
            slowMo:50,
            headless:true,
            defaultViewport: {
                width:1920,
                height:1080
            }
        });
        const page = await browser.newPage();
        await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
        const ebar = await page.$eval("#email", (e) => e.value = "bruh@gmail.com");
        const pbar = await page.$eval("#password", (e) => e.value = "testpassword");
        let button = await page.$("#lbutton");
        await button.click();
        await page.waitForNavigation();
        expect(page.url()).toBe("https://festive-minsky-ab51a6.netlify.app/source/homepage.html");
        const sbar = await page.$eval(".round", (e) => e.value = "chicken");
        button = await page.$(".fa");
        await button.click();
        await page.waitForNavigation();
        expect(page.url()).toBe("https://festive-minsky-ab51a6.netlify.app/source/searchresults.html");
        const recipes = await page.$$("recipe-card");
        expect(recipes.length).toBe(14);
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
        // await page.waitForNavigation();
        // const check = await page.$eval(".title", (e) => e.textContent);
        // expect(check).toBe(name);
        
        await browser.close();
    }, 10000);
    
    it("checking if the filters work", async () => {
        const browser = await puppeteer.launch({
            slowMo:100,
            headless:true,
            defaultViewport: {
                width:1280,
                height:720
            }
        });
        const page = await browser.newPage();
        await page.goto("https://festive-minsky-ab51a6.netlify.app/source/homepage.html");
        const sbar = await page.$eval(".round", (e) => e.value = "cake");
        const dietary = await page.select("#dietary", "Gluten Free");
        const time = await page.select("#time", "60");
        const cost = await page.select("#cost", "3");
        const button = await page.$(".fa");
        await button.click();
        await page.waitForNavigation();
        const recipes = await page.$$("recipe-card");
        expect(recipes.length).toBe(1);
        // recipes.forEach(async (recipe) => {
        //     recipe.click();
        //     await page.waitForNavigation();
        //     const tcheck = await page.evaluate(() => document.querySelector("#recipeTime").textContent);
        //     const money = await page.evaluate(() => document.querySelector("#recipeCost").textContent);
        //     expect(tcheck).toBeLessThan(60);
        //     expect(money).toBeGreaterThan(100);
        //     await page.goBack();
        // });
    }, 100000);
});
