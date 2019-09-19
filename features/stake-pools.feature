@skip
Feature: Stake pools

  The second tab "Stake pools" on the Cardano Explorer home page is featuring all currently active stake pools in the system. Some information provided by stake pools is not moderated and can contain inappropriate content. For this reason the user needs to opt-in to see stake pool information. After accepting to show unmoderated content a banner will always be visible so it would be visible in any screenshots of inappropriate content. If user does not accept to se unmoderated content stake pools page is not shown
  and user is taken back to Cardano Explorer homepage.

  To fit as many stake pools as possible on one page without scrolling in order not to
  promote only the stake pools with high ranking, only ticker symbols, rank numbers
  and optionally indications that stake pool is retiring are shown on the stake pool list.

  Background:
    Given I am on the "home" page
    And I click "Stake pools" tab
    And I see warning for unmoderated content instead of list of stake pools

  Scenario: User accepts warning regarding unmoderated content
    When I accept unmoderated content
    Then The warning disappears
    And Unmoderated content banner appears
    Then I see a color-coded list of stake pools with ticker symbols, ranking and retirement indication

  Scenario: Rejecting to show unmoderated content
    When I click "Leave this page" button
    Then I am on the "home" page

  Scenario: Stake pool details
    When I accept unmoderated content
    And I click on one of the stake pools
    Then I should see a window with stake pool details:
      | ticker symbol    |
      | ranking          |
      | title            |
      | description      |
      | website url      |
      | profit margin    |
      | performance      |
      | controlled stake |
