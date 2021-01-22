# DevSecOps Frequent Flyer REST Microservice

## Description

The goal of this project is to demostrate how TDD and BDD can be used to test application code effectively.

The project's code has a set of unit-tests, BBD tests and integration test that can be executed on demand or as part a CI/CD pipeline.

### Tech Stack

The language of choice for this project is `Typescript`. The following frameworks and tools were used to create this project:

- NestJs: A framework to build Node.js server-side applications
- Jest: A test framework for unit-test and e2e tests
- Cucumber: a tool to create and run BBD tests

##### Code Structure

- Source code and unit-tests are located in the `src` folder
- e2e tests are stored in the `test` folder
- BDD features and step definitions are located in the `features` folder

### Business Case used to in this project

> Flying High Airlines is a large commercial airline that runs both international and domestic flights. Flying High has been under pressure due to increasing costs and com- petition from low-cost carriers, so management has recently launched a new and improved version of their Frequent Flyer program to try to retain existing customers and attract new ones. This new program will offer many compelling reasons to join; like all Frequent Flyer programs, members will accumulate points when they fly, but members will also benefit from many exclusive privileges, such as access to lounges and faster boarding lines, and they’ll be able to easily spend their accumulated miles on flights and on other purchases for themselves or their family members.
>
> As part of this initiative, management wants a new website where Frequent Flyer members can see their current status in real time, redeem points, and book flights. The existing system just sends out paper account statements to members each month to tell them how many points they’ve accumulated. In addition, the Flying High call center is currently overloaded with calls, as Frequent Flyer members can only benefit from their member privileges and use their accumulated points if they book over the phone. Management hopes that being able to book directly online instead of over the phone will encourage Frequent Flyer members to book more often with Flying High.
>
> In this chapter, and throughout the rest of the book, we’ll use examples from this project to illustrate the concepts and techniques we discuss.

##### BDD Definitions used in this project

- Feature: In BDD terms, a feature is a piece of software functionality that helps users or other stakeholders achieve some business goal. A feature is not a user story, but it can be described by one or several user stories.

- A user story is a way of breaking the feature down into more manageable chunks to make them easier to implement and deliver.

- Examples BDD practitioners use concrete examples to build up a shared understanding of how a feature should behave. These examples also help flush out and clarify ambiguities and uncertainties in the requirements

##### BDD Features implemented in this project

The following feature was implemented in this project:

> Feature: Frequent Flyer status is calculated based on points
> As a Frequent Flyer member
> I want my status to be upgraded as soon as I earn enough points
> So that I can benefit from my higher status sooner
>
> Scenario: New members should start out as BRONZE members
> Given user is not a Frequent Flyer member
> When user registers on the Frequent Flyer program
> Then user should have a status of BRONZE
>
> Scenario Outline:
> Given "Dinesh Go" is a "initialStatus" FrequentFlyer member
> And "Dinesh Go" has "initialStatusPoints" status points
> When he earns "extraPoints" extra status points
> Then he should have a status of "finalStatus"
>
> Examples: Status points required for each level
> 
> | initialStatus | initialStatusPoints | extraPoints | finalStatus |
> 
> | Bronze | 0 | 300 | Silver |
> 
> | Bronze | 100 | 200 | Silver |
> 
> | Silver | 0 | 699 | Gold |
> 
> | Gold | 0 | 1500 | Platinum |
> 

This feature was copied from chapter 10 of the book BDD In Action.

Notice that for the last scenario an "examples" table is defined. This table is used by cucumber when executing BDD tests.

## How to use this project

##### Installation

This project requires NodeJs be installed on you computer.

```bash
$ npm install
```

##### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

##### Test

```bash
# unit tests
$ npm run test

# BDD tests
$ npm run bdd-tests

# e2e tests
$ npm run test:e2e -- NOT WORKING YET

# test coverage
$ npm run test:cov
```

## Things to Improve
Currently all BDD test use NodeJs's [assert](https://nodejs.org/dist/latest-v14.x/docs/api/assert.html) module for assertions therefore, when writting code the syntax for BDD tests is different than unit-tests. It will be good to find a way to use [jest](https://jestjs.io/en/) just like it's being used for unit-tests so that, the syntax is the same no matter which part of the code the developer is working on.
