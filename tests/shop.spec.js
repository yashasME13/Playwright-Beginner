const {test,expect} = require('@playwright/test');

test('login and shop automation',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("osama@gmail.com");
    await page.locator("#userPassword").fill("#yashasME13");
    await page.locator("#login").click();
    //wait for network to load all the api. untill it reaches network idle state
    await  
    const alldata=await page.locator(".card-body b").allTextContents();
    console.log(alldata);
    //for single element
    //const data=await page.locator(".card-body b").getByText("ADIDAS ORIGINAL");
    //console.log(data);
});