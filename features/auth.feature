@e2e
@auth
Feature: User Authentication and Account Management
  As a hotel user
  I want to be able to sign up, login, and manage my account securely
  So that my personal data is safely stored in the system

  @signup
  @premium
  Scenario: Guest User: Register a new Premium Membership account, logout, and re-login successfully
    Given I am on the Sign Up page
    When I register a new "Premium" account
    And I logout from the application
    And I login with the newly registered account
    Then I should be successfully logged in to My Page

  @signup
  @normal
  Scenario: Guest User: Register a new Normal Membership account, logout, and re-login successfully
    Given I am on the Sign Up page
    When I register a new "Normal" account
    And I logout from the application
    And I login with the newly registered account
    Then I should be successfully logged in to My Page

  @login
  @premium
  @preset
  Scenario: Existing User: Login with a preset Premium Membership account and logout successfully
    Given I am on the Login page
    When I login with a preset "Premium" account
    Then I should be successfully logged in to My Page
    And I logout from the application

  @login
  @normal
  @preset
  Scenario: Existing User: Login with a preset Normal Membership account and logout successfully
    Given I am on the Login page
    When I login with a preset "Normal" account
    Then I should be successfully logged in to My Page
    And I logout from the application

  @account_management
  @delete
  Scenario: Account Management: Register, login, and successfully delete the user account
    Given I am on the Sign Up page
    When I register a new "Random" account
    And I logout from the application
    And I login with the newly registered account
    And I delete my account
    Then my account should be successfully deleted

  # TC-AUTH-06
  @login
  @negative
  Scenario: Existing User: Login with a wrong password shows an error
    Given I am on the Login page
    When I login with a preset "Premium" account using a wrong password
    Then I should see the login error message
    And I should stay on the Login page

  # TC-AUTH-07
  @signup
  @negative
  Scenario: Guest User: Sign up with mismatched password confirmation shows an error
    Given I am on the Sign Up page
    When I register a new "Premium" account with a mismatched password confirmation
    Then I should see the password mismatch error message
    And I should stay on the Sign Up page

  # TC-AUTH-08
  @signup
  @negative
  Scenario: Guest User: Sign up with an invalid phone number shows an error
    Given I am on the Sign Up page
    When I register a new "Normal" account with an invalid phone number
    Then I should see the invalid phone error message
    And I should stay on the Sign Up page
