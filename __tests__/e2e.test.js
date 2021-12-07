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
<<<<<<< Updated upstream
    //     console.log("here2");   
    //     let error = await page.$eval("#invalidLogin", (e) => e.innerHTML);
    //     console.log("here1");
    //     console.log(error);
=======
    //     // console.log("here2");
    //     let error = await page.$eval("#invalidLogin", (e) => e.innerHTML);
    //     // console.log("here1");
    //     // console.log(error);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    //     const ebar = await page.$eval("#email", (e) => e.value = "bruh@gmail.com");
    //     const pbar = await page.$eval("#password", (e) => e.value = "testpassword");
=======
    //     const ebar = await page.$eval("#email", (e) => e.value = "lpalabin@ucsd.edu");
    //     const pbar = await page.$eval("#password", (e) => e.value = "Deatheater8+");
>>>>>>> Stashed changes
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
    //     });
    //     const page = await browser.newPage();
    //     await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
<<<<<<< Updated upstream
    //     const ebar = await page.$eval("#email", (e) => e.value = "bruh@gmail.com");
    //     const pbar = await page.$eval("#password", (e) => e.value = "testpassword");
=======
    //     const ebar = await page.$eval("#email", (e) => e.value = "lpalabin@ucsd.edu");
    //     const pbar = await page.$eval("#password", (e) => e.value = "Deatheater8+");
>>>>>>> Stashed changes
    //     const button = await page.$("#lbutton");
    //     await button.click();
    //     await page.waitForNavigation();
    //     const ddlist = await page.$$("option");
    //     await browser.close();
<<<<<<< Updated upstream
    //     expect(ddlist.length).toBe(15);
=======
    //     expect(ddlist.length).toBe(16);
>>>>>>> Stashed changes
    // }, 10000);

    // it("checking if creating recipes works", async () => {
    //     const browser = await puppeteer.launch({
    //         slowMo:100,
    //         headless:false,
<<<<<<< Updated upstream
    //         defaultViewport: {
    //             width:1920,
    //             height:1080
    //         }
    //     });
    //     const page = await browser.newPage();
    //     await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
    //     const ebar = await page.$eval("#email", (e) => e.value = "bruh@gmail.com");
    //     const pbar = await page.$eval("#password", (e) => e.value = "testpassword");
=======
    //     });
    //     const page = await browser.newPage();
    //     await page.goto("https://festive-minsky-ab51a6.netlify.app/source/signin");
    //     const ebar = await page.$eval("#email", (e) => e.value = "lpalabin@ucsd.edu");
    //     const pbar = await page.$eval("#password", (e) => e.value = "Deatheater8+");
>>>>>>> Stashed changes
    //     const button = await page.$("#lbutton");
    //     await button.click();
    //     await page.waitForNavigation();
    //     const drop = await page.$("button");
    //     await drop.click();
    //     const crecipe = await page.$("#recipeUpload");
    //     await crecipe.click();
    //     await page.waitForNavigation();
    //     const input = await page.$eval(".recipeNameText", (e) => e.value = "Omelette");
    //     const uploader = await page.$("input[type=file]");
<<<<<<< Updated upstream
    //     uploader.uploadFile("/Users/likithpala/Documents/GitHub/cse110-fa21-group15/__tests__/img.jpeg");

    //     const time = await page.$eval(".timeBoxInput", (e) => e.value = "10 mins");
    //     const cost = await page.$eval(".costBoxInput", (e) => e.value = "$5");
    //     const size = await page.$eval(".servingsBoxInput", (e) => e.value = "1 serving");
    //     const desc = await page.$eval("#descriptionBoxInput", (e) => e.value = "How to make a breakfast omelette!");
    //     const ings = await page.$eval("#ingredientsBoxInput", (e) => e.value = "eggs, chili powder, salt, oil");
    //     const steps = await page.$eval("#stepsBoxInput", (e) => e.value = "beat the eggs, add chill powder, add salt, mix, add oil to the pan and put the eggs in the pan, wait for the egg to cook");

    //     const save = await page.$eval(".btTxt", (e) => e.click());
    //     await page.waitForNavigation();

    //     expect(page.url()).toBe("https://festive-minsky-ab51a6.netlify.app/source/cookbook.html");
        
    //     await browser.close();
    // }, 100000);

=======
    //     uploader.uploadFile("./ ");

    //     const time = await page.$eval(".timeBoxInput", (e) => e.value = "10 mins");
    //     const cost = await page.$eval(".costBoxInput", (e) => e.value = "$5");
    //     const size = await page.$eval(".servingsBoxInput", (e) => e.value = "1 serving");
    //     const desc = await page.$eval("#descriptionBox", (e) => e.value = "How to make a breakfast omelette!");
    //     const ings = await page.$eval("#ingredientsBox", (e) => e.value = "eggs, chili powder, salt, oil");
        
    //     await browser.close();
    // }, 100000);

    it("checking if searching for recipe works", async () => {
        const browser = await puppeteer.launch({
                    slowMo:100,
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
        // expect(page.url()).toBe("https://festive-minsky-ab51a6.netlify.app/source/homepage.html");
        const sbar = await page.$eval(".round", (e) => e.value = "chicken");
        button = await page.$(".fa");
        await button.click();
        await page.waitForNavigation();
        // expect(page.url()).toBe("https://festive-minsky-ab51a6.netlify.app/source/searchresults.html");
    }, 100000);
>>>>>>> Stashed changes

});