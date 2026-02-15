const {test,expect,context} = require('@playwright/test');

test.only('child windows handling', async({browser})=>{

    const product="ZARA COAT 3";
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("osama@gmail.com");
    await page.locator("#userPassword").fill("#yashasME13");
    await page.locator("#login").click();
    //wait for network to load all the api. untill it reaches network idle state
    await page.waitForLoadState('networkidle');
    const data=await page.locator(".card-body");
    await console.log(data);

    let element=await page.locator("li button label").textContent();
    
    let number=0;
    // if (cartelement){
    //     number=number+1;
    // }

    //const addtocart=await page.locator('button.btn.w-10.rounded');
    //await addtocart.click().
    const count=await data.count();
    await console.log(count);
    let i=0;
    for (i=0;i<count;i++){
        
        if (await data.nth(i).locator("b").textContent()==product){
            await data.nth(i).locator('button.btn.w-10.rounded').click();
            break;
        }
    }
    
    let initial=0;
    let cartelement=await page.locator("li button label").textContent();
    await console.log("cartelements:"+cartelement);
    if( cartelement>initial){
        console.log("item added successfully");
        initial=cartelement
    }
    //.infoWrap h3
    await page.locator("li button").nth(2).click();
    await page.waitForLoadState('networkidle');
    await page.pause();
    cartitems=await age.locator(".infoWrap ");
    let cartnum=await cartitems.count();
    for(let i=0;i<cartnum;i++){
        if (await  cartitems.nth(i).locator("h3")==product){
            const elementid = cartitems.nth(i).locator(".itemNumber").textContent();
        }
    }
    
})