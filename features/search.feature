@skip
Feature: Search

  Search feature supports searching for epochs, blocks, transactions and addresses.
  If a single result is found details are displayed, if no results, or multiple results are found, simple instructions
  for searching are displayed with text that was used as an input for the search. Search input field is cleared
  after every search because refining the search is not useful because users usually paste long and cryptic IDs
  when searching. The opposite is true for example with Google searches where search is usually refined
  in multiple iterations.

  Background: Given I am on the Cardano Explorer home page

    Example: Search for a transaction by transaction id and get transaction details

      User can enter complete or partial transaction id and get transaction details if search matches only
      one transaction and nothing else search feature is supporting.

      Given I enter transaction id for the transaction I am searching for
      And I submit search form
      And My search matches one, and one only, transaction in Cardano blockchain
      Then Transaction details page is shown
      And I can see transaction details:
        | date and time |
        | total output  |
        | fee           |
        | inputs        |
        | outputs       |
        | block         |
      And input field in the search form is cleared

     Example: Search for block by block id and get block details

       User can enter complete or partial block id and get block details if search matches only one block
       and nothing else search feature is supporting.

       Given I enter block id for the block I am searching for
       And I submit search form
       And My search matches one, and one only, block in Cardano blockchain
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

  Example: Search for address by address and get address details

  User can enter complete or partial address and get address details if search matches only one address
  and nothing else search feature is supporting.

    Given I enter address for the address I am searching for
    And I submit search form
    And My search matches one, and one only, address in Cardano blockchain
    Then Address details page is shown
    And I can see block details:
      | address                |
      | number of transactions |
      | balance                |
      | qr code                |
      | transactions           |
    And input field in the search form is cleared

  Example: Search for epoch by epoch number and get epoch details

  User can enter epoch number and get epoch details if search matches epoch existing in the blockchain.

    Given I enter epoch number for the epoch I am searching for
    And My search matches one, and one only, epoch in the blockchain
    Then Hint to optionally enter block number is displayed
    And I submit my search without entering block number
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

  Example: Search for block by epoch and slot number and get block details

  User can enter epoch number and slot number and get block details if search matches epoch and block in the blockchain.

    Given I enter epoch number for the block I am searching for
    And My search matches one, and one only, epoch in the blockchain
    Then Hint to optionally enter block number is displayed
    And I enter slot number for the block I am searching for
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

  Example: Search not matching anything supported

  User enters search query which does not match anything supported by search and search instructions are displayed

    Given I enter my query in the search input
    And I submit search form
    And My search matches nothing supported by the search feature
    Then Error message that nothing was found is displayed
    And my search query is displayed in the error message
    And search instructions are displayed to help me with my search
    And input field in the search form is cleared

  Example: Search matching multiple results

  User enters search query which matches more than one result supported by search and search instructions are displayed

    Given I enter my query in the search input
    And I submit search form
    And My search matches more than one result supported by the search feature
    Then Error message that my search matches more than one result is displayed
    And my search query is displayed in the error message
    And search instructions are displayed to help me with my search
    And input field in the search form is cleared
