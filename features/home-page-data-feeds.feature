@skip
Feature: Home page data feeds

  Cardano Explorer home page features a list of latest epochs and a list of latest blocks in the current epoch.

  Scenario: Latest epochs

    List of recent epochs displays the most important information about last 5 epochs and a "Show more epochs" button
    which opens a paginated list of all epochs with filtering options.

    Given I am on Cardano Explorer home page
    Then List of 5 latest epochs is shown
    And I can see epoch data:
      | epoch number           |
      | number of slots        |
      | number of blocks       |
      | started date and time  |
      | ended date and time    |
      | number of transactions |
      | total output in ada    |
    And I can see "Show more epochs" button

  Scenario: Disabled "Show more epochs" button

    If there is 5 or less epochs in the blockchain "Show more epochs" button is disabled.

    Given I am on Cardano Explorer home page
    And there is 5 or less epochs in the blockchain
    Then "Show more epochs" button is disabled

  Scenario: Latest blocks

    List of recent blocks displays the most important information about last 10 blocks in the current epoch and
    "Show more blocks" opens a paginated list of all blocks for the current epoch with filtering options.

    Given I am on Cardano Explorer home page
    Then List of 10 latest blocks is shown
    And I can see block data:
      | epoch number           |
      | slot / block number    |
      | creation date and time |
      | number of transactions |
      | total output in ada    |
      | size in bytes          |
      | creator                |
    And I can see "Show more blocks" button

  Scenario: Disabled "Show more blocks" button

    If there is 10 or less blocks in the current epoch "Show more blocks" button is disabled.

    Given I am on Cardano Explorer home page
    And there is 10 or less blocks in the current epoch
    Then "Show more blocks" button is disabled
