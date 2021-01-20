Feature: Frequent Flyer status is calculated based on points
  As a Frequent Flyer member
  I want my status to be upgraded as soon as I earn enough points
  So that I can benefit from my higher status sooner

Scenario: New members should start out as BRONZE members
  Given user is not a Frequent Flyer member
  When user registers on the Frequent Flyer program
  Then user should have a status of BRONZE

Scenario Outline:
  Given "Dinesh Go" is a "<initialStatus>" FrequentFlyer member
  And "Dinesh Go" has <initialStatusPoints> status points
  When "Dinesh Go" earns <extraPoints> extra status points
  Then he should have a status of "<finalStatus>"

Examples: Status points required for each level0
  | initialStatus | initialStatusPoints | extraPoints | finalStatus |
  | Bronze        | 0                   | 300         | Silver     |
  | Bronze        | 100                 | 200         | Silver     |
  | Silver        | 0                   | 699         | Gold       |
  | Gold          | 0                   | 1500        | Platinum   |

