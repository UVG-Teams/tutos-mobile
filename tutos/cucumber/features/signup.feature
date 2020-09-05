Feature: signup
  Everybody needs to register for access to the app

  Scenario: A user want to register
    Given the user is not registered
    When signup
    Then create an account