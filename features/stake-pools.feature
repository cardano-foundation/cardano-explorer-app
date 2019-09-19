@skip
Feature: Stake pools

  The second tab "Stake pools" on the Cardano Explorer home page is featuring all currently
  active stake pools in the system.

  Scenario: Accepting warning for unmoderated content to see stake pools

    Data about stake pools is not moderated and can contain inappropriate content. For this
    reason user needs to accept to see unmoderated content before Cardano Explorer
    shows stake pool list and stake pool details.
    After accepting to show unmoderated content Cardano Explorer will show a notification
    on top of user interface which will always visible. This is important because we can
    expect screenshots of inappropriate content.

    Given I am on the "home" page
    And I click "Stake pools" tab
    Then I see warning for unmoderated content instead of list of stake pools
    When I click "Yes, show unmoderated content" button
    Then The warning disappears
    And Label explaining that I have accepted to see unmoderated content appears
    And I see the list of stake pools

  Scenario: Rejecting to show unmoderated content shows home page

    If user does not accept to se unmoderated content stake pools page is not shown
    and user is taken back to Cardano Explorer homepage.

    Given I am on the "home" page
    And I click "Stake pools" tab
    Then I see warning for unmoderated content instead of list of stake pools
    When I click "Leave this page" button
    Then "home" page is shown

  Scenario: List of stake pools ordered by their ranking

    To fit as many stake pools as possible on one page without scrolling in order not to
    promote only the stake pools with high ranking, only ticker symbols, rank numbers
    and optionally indications that stake pool is retiring are shown on the stake pool list.

    Given I am on "Stake pools" tab
    And I have accepted to see unmoderated content
    Then I see a color-coded list of stake pools with ticker symbols, ranking and retirement indication

  Scenario: Stake pool details

    Given I am on "Stake pools" tab
    And I have accepted to see unmoderated content
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


