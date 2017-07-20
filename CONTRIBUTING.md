# Contributing to CASL

I would love for you to contribute to CASL and help make it even better than it is
today! As a contributor, here are the guidelines I would like you to follow:

 - [Question or Problem?](#question)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)
 - [Commit Message Guidelines](#commit)

## <a name="question"></a> Got a Question or Problem?

Do not open issues for general support questions as I want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [gitter chat][gitter].

## <a name="issue"></a> Found a Bug?
If you find a bug in the source code, you can help by [submitting an issue](#submit-issue) or even better, you can [submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?
You can *request* a new feature by [submitting an issue](#submit-issue) to this GitHub Repository. If you would like to *implement* a new feature, please submit an issue with a proposal for your work first, to be sure that somebody else hasn't started to do the same.

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

Please provide steps to reproduce for found bug (using http://plnkr.co or similar), this will help to understand and fix the issue faster.

### <a name="submit-pr"></a> Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

* Search [GitHub](https://github.com/stalniy/casl/pulls) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
* Make your changes in a new git branch:

     ```sh
     git checkout -b my-fix-branch master
     ```

* **include appropriate test cases**.
* Follow defined [Coding Rules](#rules).
* Run all test suites `npm test`
* Commit your changes using a descriptive commit message that follows defined [commit message conventions](#commit). Adherence to these conventions is necessary because release notes are automatically generated from these messages.
* Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```
* In GitHub, send a pull request to `casl:master`.
* If somebody from project contributors suggest changes then:
  * Make the required updates.
  * Re-run all test suites to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request). Basically you can use `git commit -a --amend` and `git push --force origin my-fix-branch` in order to keep single commit in the feature branch.

That's it! Thank you for your contribution!

## <a name="rules"></a> Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests).
* All public API methods **must be documented**.
* Project follows [Airbnb's JavaScript Style Guide][js-style-guide] with [some exceptions](.eslintrc). All these will be checked by Travis ci when you submit your PR

## <a name="commit"></a> Commit Message Guidelines

The project have very precise rules over how git commit messages can be formatted.  This leads to **more readable messages** that are easy to follow when looking through the **project history**.  But also, git history is used to **generate the change log**.

The commit message format is borrowed from Angular projects and you can find [more details in this document][commit-message-format]

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
[github]: https://github.com/stalniy/casl
[gitter]: https://gitter.im/stalniy-casl/casl
[js-style-guide]: https://github.com/airbnb/javascript
