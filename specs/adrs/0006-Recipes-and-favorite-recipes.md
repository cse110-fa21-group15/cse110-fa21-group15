# Using two separate lists to separate favorite recipes and recipes we've created

## Context and Problem Statement

We want to allow users to select between items in personal cookbook that theyve made and favorites
Should we create two different collections to store favorites and personal cookbook or combine them to one?

## Considered Options

* Combine to a single personal cookbook page with your favorited recipes and recipe you've created
* Separate the personal cookbook and favorite recipes list.

## Decision Outcome

Chosen option: Separate the personal cookbook and favorite recipes list.

* It helps the user separate the cluster of recipes they may have craeted
* Users may not like all the recipes they've craeted, so favorites helps distinguish the user's current favorites at any moment
* Implementing an extra collection in firebase to take care of this should not be difficult.
