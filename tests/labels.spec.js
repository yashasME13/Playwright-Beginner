const {test,expect,context} = require('@playwright/test');

test.only('child windows handling', async({page})=>{
    page.goto("https://rahulshettyacademy.com/angularpractice/");
});