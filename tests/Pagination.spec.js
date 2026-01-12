const {test,expect} = require('@playwright/test');

test('page',async ({page})=>{
    await page.goto("http://10.221.31.41:3000/");
    await page.locator("input.w-full").first().fill("user");
    await page.locator("input.w-full").nth(1).fill("user@123");
    await page.locator("button").click();

    const button = await page.locator("button[title='Next page']");
    // const length = await page.locator("tbody tr").textContent();
    // await console.log("number of rows in page is ",length); 
    const i=1;
    do{
        await console.log("Inside Page ",i);
        //i=i+1;
        const length = await page.locator("tbody tr td").allTextContents();
        //const length2= await length.locator()
        await console.log("number of rows in page ",length); 
        //await page.pause();
        await button.click();
        await page.waitForLoadState('networkidle');
        // await page.pause();
    }
    while(await button.isEnabled()) {

    }

});