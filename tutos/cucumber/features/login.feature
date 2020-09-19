Feature: login
  Everybody needs to login for use the app

  Scenario: A user don't have an account
    Given the user is not registered
    When tries to login
    Then can't access to the app


  Scenario: A user have an account
    Given the user is registered
    When tries to login
    Then can access to the app and go to home page