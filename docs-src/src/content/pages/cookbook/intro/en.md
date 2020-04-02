---
title: Cookbook Introduction
categories: [cookbook]
order: 10
meta:
  keywords: ~
  description: ~
---

## The Cookbook vs the Guide

How is the cookbook different from the guide? Why is this necessary?

* **Greater Focus**. In the guide, we're essentially telling a story. Each section builds on and assumes knowledge from each previous section. In the cookbook, each recipe stands on its own. This means recipes focus on one specific topic or use case, rather than having to give a general overview.
* **Greater Depth**. To avoid making the guide too long, we try to include only the simplest possible examples to help you understand each feature. Then we move on. In the cookbook, we can include more complex examples, combining features in interesting ways. Each recipe can also be as long and detailed as it needs to be, in order to fully explore its niche.
* **Greater Complexity**. In the guide, we assume at least intermediate familiarity with ES2015 JavaScript. In the cookbook however, you will see more TypeScript code, frontend and backend frameworks and libraries and real-world examples.

> For most of cookbook's content, you are expected to have a basic understanding of concepts like JavaScript, npm/yarn, commonjs, ES import/export, Node.js module resolution algorithm. Depending on the recipe you are expected to know frontend or backend libraries and frameworks.

## Cookbook Contributions

The Cookbook gives developers examples to work off of that both cover common or interesting use cases, and also progressively explain more complex detail. Our goal is to move beyond a simple introductory example, and demonstrate concepts that are more widely applicable, as well as some caveats to the approach.

If you’re interested in contributing, please initiate collaboration by filing an issue under the tag **cookbook idea** with your concept so that we can help guide you to a successful pull request. After your idea has been approved, please follow the template below as much as possible. Some sections are required, and some are optional. Following the numerical order is strongly suggested, but not required.

Recipes should generally:

* Solve a specific, common problem
* Start with the simplest possible example to demonstrate the issue
* Introduce complexities one at a time
* Link to other docs, rather than re-explaining concepts
* Describe the problem, rather than assuming familiarity
* Explain the process, rather than just the end result
* Explain the pros and cons of your strategy, including when it is and isn't appropriate
* Mention alternative solutions, if relevant, but leave in-depth explorations to a separate recipe

We ask you to follow the template below. We understand, however, that there are times when you may necessarily need to deviate for clarity or flow. Either way, all recipes should at some point discuss the nuance of the choice made using this pattern, preferably in the form of the alternative patterns section.

### The issue

*required*

1. Articulate the problem in a sentence or two.
2. Show the simplest possible solution which leads to issues in the long run.
3. Explain the **disadvantages** of this solution

### The solution

*required*

1. Provide the suggested way to solve the issue
2. Explain the **advantages** in comparison to the simplest solution described in the section above
3. Discuss why this may be a compelling solution. Links for a reference are not required but encouraged
4. Walk through a few terse examples

### Demo

*required*

Demonstrate the code that would power a common or interesting use case by embedding a codesandbox/scrimba/codepen/jsfiddle example.

### When To Avoid

*optional*

This section is not required, but heavily recommended. Here, we’ll take an honest look at when the pattern is useful and when it should be avoided, or when something else makes more sense.

### Alternative Ways

*optional*

Similar to the previous section this one is optional, but very encouraged. The answer to most questions about development is **"It depends!"**. So, it’s important to explore other methods to let people compare and understand whether this solution makes sense in their situation.

## Thank you

It takes time to contribute to documentation, and if you spend the time to submit a PR to this section of our docs, you do so with our gratitude.
