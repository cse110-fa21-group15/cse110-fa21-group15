# Allow multiple or single week planning

## Context and Problem Statement

We want to allow users to create a meal plan so they can plan their meals for the week.
Should users be able to create it for only the current/single week, or can they plan ahead and look at their history?

## Considered Options

* Single week
* Multiple weeks

## Decision Outcome

Chosen option: Single week, because

* Doing multiple weeks would cause conflict in storing recipes in the database by date
* It would be hard to maintain history
