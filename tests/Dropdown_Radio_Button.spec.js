const {test, expect} = require('@playwright/test');
test.only("Dropdown button, radio button handling", async ({page})=>{
    const username=page.locator("#username");
    const password=page.locator("[name='password']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("learning");
    await password.fill("learning");
    await page.locator("#signInBtn").click();
    await expect(await page.locator(("[style*='block']"))).toContainText('Incorrect');
    await username.clear();
    await password.clear();
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    const options= await page.locator("select.form-control");
    await options.selectOption("consult");
    await page.locator("input#usertype").nth(1).click();
    const dialogbox=page.locator("#okayBtn");
    await expect(dialogbox).toBeVisible();
    await dialogbox.click();
    //pause the test for n time. u get option to play aswell
    //await page.pause();
    await page.locator("#signInBtn").click();
    // if there are multiple div tags u have to use parent class 1st and then child element
    // if there are many element with same div tags u can use nth() function to select the nth element from the array
    //textcontent() is used to grab the text in that particular element
    //await page.locator(".card-body a").nth(1).textContent();
    // u can also use alltextcontent() to get all the elements which matches the locator
    await page.waitForLoadState('networkidle');
    console.log(await page.locator(".card-body a").allTextContents());
    //await page.waitForTimeout(10000);
});

test("Tutorial", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username=await page.locator("#username");
    const signIn=await page.locator("#signInBtn");
    //const password=page.locator("[name='password']");
    const dropdown=await page.locator("select.from-control");
    await dropdown.selectOption("consult");
    await page.locator(".radioteststy").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    
    // await page.pause();

});