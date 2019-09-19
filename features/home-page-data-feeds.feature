@skip
Feature: Home page data feeds

  The home page features a list of latest epochs and a list of latest blocks in the current epoch. The user can choose to show more, which presents a paginated list with filter controls.

  Background:
    Given I am on the "home" page

  Scenario: Viewing the home page with at least 5 epochs already complete in the blockchain

    Given The the current epoch is 6
    Then The latest 5 epochs are shown
    And I can see epoch data:
      | epoch number           |
      | number of slots        |
      | number of blocks       |
      | started date and time  |
      | ended date and time    |
      | number of transactions |
      | total output in ada    |
    And I can choose to show more epochs

  Scenario: Viewing the home page with 5 or less epochs already complete in the blockchain

    Given The the current epoch is 4
    Then The latest 4 epochs are shown
    And I cannot choose to show more epochs

  Scenario: Viewing the home page with at least 10 blocks already created in the current epoch

    Given The the latest block in the current epoch is 11
    Then The latest 10 blocks in the current epoch are shown
    And I can see block data:
      | epoch number           |
      | slot / block number    |
      | creation date and time |
      | number of transactions |
      | total output in ada    |
      | size in bytes          |
      | creator                |
    And I can choose to show more blocks

  Scenario: Viewing the home page with 10 or less epochs already complete in the current epoch

    Given The the latest block in the current epoch is 9
    Then The latest 9 blocks in the current epoch are shown
    And I cannot choose to show more blocks
