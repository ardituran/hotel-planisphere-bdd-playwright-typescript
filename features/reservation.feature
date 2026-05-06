@e2e @reservation
Feature: Guest Hotel Reservation Workflow
  As a non-logged-in guest
  I want to be able to reserve various types of hotel plans
  So that I can successfully book a room that fits my needs

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