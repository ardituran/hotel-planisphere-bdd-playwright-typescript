@e2e
@reservation
Feature: Hotel Reservation for All User Types
  As various user types (Guest, Normal Member, Premium Member)
  I want to be able to reserve hotel plans that are available for my level
  So that I can enjoy the hotel services according to my membership

  Scenario Outline: Guest Booking: Validate end-to-end reservation workflow for "<PlanName>"
    Given I am on the hotel home page
    When I select the "<PlanName>" room plan
    And I fill the reservation form for "<PlanName>" with valid random data
    And I submit the reservation form
    Then I should see the reservation success message

    Examples:
      | PlanName                  |
      | Plan with special offers  |
      | Staying without meals     |
      | Business trip             |
      | With beauty salon         |
      | With private onsen        |
      | For honeymoon             |
      | With complimentary ticket |

  @member
  @premium
  @existing
  Scenario Outline: Existing Premium Member: Reserve all available plans including "<PlanName>"
    Given I am logged in as a "Premium" member
    When I select the "<PlanName>" room plan
    And I fill the reservation form for "<PlanName>" with valid random data
    And I submit the reservation form
    Then I should see the reservation success message

    Examples:
      | PlanName                  |
      | Premium plan              |
      | With dinner               |
      | Economical                |
      | Plan with special offers  |
      | Staying without meals     |
      | Business trip             |
      | With beauty salon         |
      | With private onsen        |
      | For honeymoon             |
      | With complimentary ticket |

  @member
  @normal
  @existing
  Scenario Outline: Existing Normal Member: Reserve available plans including "<PlanName>"
    Given I am logged in as a "Normal" member
    When I select the "<PlanName>" room plan
    And I fill the reservation form for "<PlanName>" with valid random data
    And I submit the reservation form
    Then I should see the reservation success message

    Examples:
      | PlanName                  |
      | With dinner               |
      | Economical                |
      | Business trip             |
      | Plan with special offers  |
      | Staying without meals     |
      | With beauty salon         |
      | With private onsen        |
      | For honeymoon             |
      | With complimentary ticket |

  @member
  @new_user
  @delete_after
  Scenario Outline: New Member: Sign up as "<Rank>", login, and reserve "<PlanName>"
    Given I am on the Sign Up page
    When I register a new "<Rank>" account
    And I logout from the application
    And I login with the newly registered account
    And I select the "<PlanName>" room plan
    And I fill the reservation form for "<PlanName>" with valid random data
    And I submit the reservation form
    Then I should see the reservation success message
    And I delete my account

    Examples:
      | Rank    | PlanName     |
      | Premium | Premium plan |
      | Normal  | With dinner  |
