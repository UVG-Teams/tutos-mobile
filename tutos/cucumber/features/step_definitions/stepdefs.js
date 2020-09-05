const assert = require('assert');
const { Given, When, Then } = require('cucumber');


Given('the user is not registered', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'can\'t access to the app';
  });

Given('the user is registered', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'can access to the app and go to home page';
});

When('tries to login', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'can\'t access to the app';
});

Then('can\'t access to the app', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'need to register';
});

Then('can access to the app and go to home page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'success';
});

When('signup', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'the user is registered';
});


Then('create an account', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'user fill infomration';
});

