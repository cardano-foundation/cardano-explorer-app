@skip
Feature: Search

  Search feature supports searching for epochs, blocks, transactions and addresses.
  If a single result is found details are displayed, if no results, or multiple results are found, simple instructions
  for searching are displayed with query that was used as an input for the search. Search input field is cleared
  after every search because refining the search is not useful because users usually paste long and cryptic IDs
  when searching. The opposite is true for example with Google searches where search is usually refined
  in multiple iterations. User can enter complete or partial transaction id and get transaction details if search matches only
  one transaction, or epoch number and slot number and get block details.

  Background:
    Given I am on the "home" page

    Scenario: Searching for a transaction by providing complete valid ID

      When I enter "36497bfdfc0b5a836477a1716cfd3c9fc5d34c04c9e3208f087f0b10290ea79d" in the search input field
      And I submit search form
      Then Transaction details page is shown
      And I can see transaction details:
        | date and time |
        | total output  |
        | fee           |
        | inputs        |
        | outputs       |
        | block         |
      And input field in the search form is cleared

    Scenario: Searching for block by providing complete valid block ID

      When I enter "d2210effd1b09da47998c7fc9e890beb1825114e734c343dd920829e781c6325" in the search input field
      And I submit search form
      Then Block details page is shown
      And I can see block details:
        | block id                |
        | epochs and slot         |
        | number of confirmations |
        | size                    |
        | transaction count       |
        | creator                 |
        | creation time           |
        | previous block          |
        | next block              |
        | merkle root             |
        | coinbase transaction    |
        | transactions            |
      And input field in the search form is cleared

    Scenario: Searching for an address by providing complete valid address string

      When I enter "Ae2tdPwUPEZNEEuiFn5BjuCDbw1KVLEjnMp47UZp2PP4E7v7v2u6F31VJfx" in the search input field
      And I submit search form
      Then Address details page is shown
      And I can see address details:
        | address                |
        | number of transactions |
        | balance                |
        | qr code                |
        | transactions           |
      And input field in the search form is cleared

    Scenario: Searching for an epoch by providing only a valid epoch number

      When I enter "3" in the search input field
      Then Hint to optionally enter block number is displayed
      And I submit search form
      Then Epoch details page is shown
      And I can see epoch details:
        | epoch number              |
        | number of blocks vs slots |
        | date and time started     |
        | date and time ended       |
        | number of transactions    |
        | total output              |
        | blocks                    |
      And input field in the search form is cleared

    Scenario: Searching for block by epoch and slot number

      When I enter "3" in the search input field
      Then Hint to optionally enter block number is displayed
      And I enter 2 in the slot number input
      And I submit search form
      Then Block details page is shown
      And I can see block details:
        | block id                |
        | epochs and slot         |
        | number of confirmations |
        | size                    |
        | transaction count       |
        | creator                 |
        | creation time           |
        | previous block          |
        | next block              |
        | merkle root             |
        | coinbase transaction    |
        | transactions            |
      And input field in the search form is cleared

    Scenario: Search string cannot be matched to any of the data types

      When I enter "abcd" in the search input field
      And I submit search form
      Then I see no results found Error including the original query
      And I see search instructions to assist
      And input field in the search form is cleared

    Scenario: Search matching multiple results

      When I enter "d2210ef" in the search input field
      And I submit search form
      Then I see mutliple results Error including the original query
      And I see search instructions to assist
      And input field in the search form is cleared
