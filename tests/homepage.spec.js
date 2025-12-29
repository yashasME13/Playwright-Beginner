const {test, expect} =  require('@playwright/test');

// u can use function() or ()=> 
// the second one is anonymous function so no need to write the function

// u need to pass t`he browser keyboard so the test function knows 
// this is coming from playwright/tests this is called playwright fixture

test('First Playwright test',async ({browser})=>{

    //This is a function: test has 2 arguments that is title and function: inside 
    // the function u can write the code

    // U need content: plugins/cookies of browser
    // u need instance of browser
    // u need new instance of context for fresh browser: no plugins or cookies
    //its like incognito mode
    //   browser.newContext()

    // if u want new instance with existing cookies u can do it with cookie injection
    const context=await browser.newContext();
    // browser is open
    // now u need a new page or windows
    const page= await context.newPage();
    // now that page is open
    await page.goto("https://google.com");
    
    context.close();

});

//only function will run only that particular testcase

test("2nd type to the same thing as first", async ({page})=>{
    // u can skin the part of opening the browser andopening a page by using page
    // this is default mode but if u want cookies or plugins then this wont work 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title1= await page.title();
    console.log(title1);
    //assertions by default
    // assertions are present in expect function
    await expect(page).toHaveTitle(title1);
    //css is reliable, xpath is not
    // css like id, class
    // css like tage name="username"
    await page.locator('input#username').fill("Osama");
    await page.locator("[name='password']").fill("bin laden");
    await page.locator("#signInBtn").click();

    //handling a 2 sec pop up which appears hwne incorrrect password is entered
    // text content is used to grab the text 
    const msg=await page.locator("[style*='block']").textContent();

    if (await page.locator("[style*='block']")){
        console.log('incorrect credentials');
        console.log(msg);
    }
    else{
        console.log("login success");
    }
    
}); 

test("login validation with expect assertion", async ({page})=>{
    // u can skin the part of opening the browser andopening a page by using page
    // this is default mode but if u want cookies or plugins then this wont work 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title1= await page.title();
    console.log(title1);
    //assertions by default
    // assertions are present in expect function
    await expect(page).toHaveTitle(title1);
    //css is reliable, xpath is not
    // css like id, class
    // css like tage name="username"
    await page.locator('input#username').fill("rahulshettyacademy");
    await page.locator("[name='password']").fill("learning");
    await page.locator("#signInBtn").click();
    //await expect(await page.locator(("[style*='block']"))).toContainText('Incorrect');
    // tohavecount(1) makes sure the element appears. tohavecount(1) makes sure the element never appears
    await expect(page.locator("[class='alert alert-danger col-md-12']")).toHaveCount(0, { timeout: 3000 });
}); 

test("login and handling error message using is visibale method", async ({page})=>{
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
    await page.locator("#signInBtn").click();
    // if there are multiple div tags u have to use parent class 1st and then child element
    // if there are many element with same div tags u can use nth() function to select the nth element from the array
    //textcontent() is used to grab the text in that particular element
    //await page.locator(".card-body a").nth(1).textContent();
    // u can also use alltextcontent() to get all the elements which matches the locator
    console.log(await page.locator(".card-body a").allTextContents());
    //await page.waitForTimeout(10000);
});

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


test('Playwright Actions',async ({page})=>{
    await page.goto("https://google.com");
    await page.reload();
    //await page.getAttribute('#APjFqb');
    await page.isVisible("Google Search");
    await page.getByText('Google Search').hover();
    await page.click();
});

