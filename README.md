# Tasks Board
Using NextJS, React, and any SQL database, develop a full stack solution for a Board with 4 columns:  `BACKLOG` `TODO` `DOING` `DONE`

## Considerations:
* Cards can only be moved by one column in any direction.
* There can only be two cards in DOING at any time
* Once in Done, cards cannot go back
* Moving cards to DONE will trigger a confirmation dialog
* All actions on the board must be validated at least server-side
* Board to be stored in Local Storage


## What we value
* Simple design
    * SOLID
    * KISS
    * DRY
* Effective Architectural and design decisions
    * Separating business rules from infrastructure details
* REST api design
* Testing Strategy
    * Provide the right amount of unit/integration/end-to-end tests following the testing pyramid or any principle you choose.
* Straightforward setup and execution

| :memo: | We understand that all decisions in Engineering are tradeoffs, so please include a readme with your decision-making process. |
|--------|:-----------------------------------------------------------------------------------------------------------------------------|

# Decisions

1. Unit tests for core functionality. Task movements validations on the board
2. Using Object mother pattern to create test data
3. Board movement restrictions are defined on the domain model, since we don't expect them to change. Otherwise, we'd save the restrictions on the database.
4. I decided to specify the one column movement restriction on the board (instead of the task), since it looks more scalable to me. This way we could have different kind of boards with different column restrictions.
5. I saved the task on localStorage as specified in the task. But we could just retrieve them from database

## Improvements

1. Dynamics columns. For simplicity I'll keep the columns as mentioned in the task description.
2. Using different database for dev and test.
3. Paginate tasks retrieval