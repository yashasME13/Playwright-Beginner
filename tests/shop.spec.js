
const {test,expect,context} = require('@playwright/test');

test('login and shop automation',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("osama@gmail.com");
    await page.locator("#userPassword").fill("#yashasME13");
    await page.locator("#login").click();
    //wait for network to load all the api. untill it reaches network idle state
    await page.waitForLoadState('networkidle');
    //to check if the element is visible
    //const alldata=await page.locator(".card-body b").allTextContents();
    //console.log(alldata);
    //for single element
    const data=await page.locator(".card-body b").getByText("ADIDAS ORIGINAL");
    console.log(data);
});

test('UI controls', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const username = page.locator('#username');
    const password = page.locator('#password');
    const blinking=page.locator("[href*='documents-request']");
    await username.fill('rahulshettyacademy');
    await password.fill('learning');

    await page.locator('select.form-control').selectOption('consult' );
    await page.locator('input#usertype').last().click();
    await expect(page.locator("#okayBtn")).toBeVisible();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await page.pause();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    // await expect(okBtn).toBeHidden();
    await expect(blinking).toHaveAttribute("class","blinkingText");
});

test.only('child windows handling', async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinking=page.locator("[href*='documents-request']");

    //very important
    //need parallel execution of both the below operations(asynchronous)
    const[newpage]=await Promise.all([
    context.waitForEvent('page'), // this will listen for the browser to check for another page
    // 
    blinking.click()])// new page is opened
    //console.log(await newpage.locator(".red").inputValue());
    const text=await newpage.locator(".red").textContent();
    const arr=text.split("@");
    console.log(arr);
})