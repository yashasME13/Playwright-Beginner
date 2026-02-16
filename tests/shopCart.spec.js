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
    
    const cartitems=await page.locator(".infoWrap ");
    let cartnum=await cartitems.count();
    for(let i=0;i<cartnum;i++){
        if (await  cartitems.nth(i).locator("h3")==product){
            const elementid = await cartitems.nth(i).locator(".itemNumber").textContent();
        }
    }
    await page.locator("text=Checkout").click();
    await page.waitForLoadState('networkidle');
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    
    await expect(page.locator(".ta-results")).toBeVisible();
    const dropdown=page.locator(".ta-results button");
    //await dropdown.waitFor();
    let newcount=await dropdown.count();
    await console.log("dropdown"+newcount+dropdown);
    for(let k=0;k<newcount;k++){
        console.log(await dropdown.nth(k).textContent());
        if(await dropdown.nth(k).textContent()==" India"){
            await console.log("india found");
            await dropdown.nth(k).click();
            break;
        }
        
    }
    // here to have text is useful to check if we have required text or not
    await expect(page.locator(".user__name label")).toHaveText("osama@gmail.com");
    // click place order button
    await page.locator(".actions a").click();
    //now copy the order id once order is placed
    const orderid=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    //await console.log("Order id:"+orderid);
    //await page.pause();
    //now slice the string as it has spaces and unnecessary characters
    const neworderid=await orderid.slice(3,27);
    await console.log("after orderid:"+neworderid+"JNNN");
    //later click the order button
    await page.locator("li .btn").nth(1).click();
    await page.waitForLoadState("networkidle");
    
    
    // Wait for exactly 5 seconds
    await page.waitForTimeout(5000); 
    const ids = await page.locator(".ng-star-inserted th");
    
    await console.log("num of id: ",ids.count());
    //const ids=await page.locator(".ng-star-inserted th");
    for(let a=0;a<ids.count();a++){
        await console.log("Elements are:");
        console.log(await ids.nth(a).textContent());
    }


    await page.pause();
})