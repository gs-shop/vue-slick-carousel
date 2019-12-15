# Contributing

First off, thanks for taking the time to contribute! 🎉 😘 ✨

The following is a set of guidelines for contribution. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Reporting Bugs

Bugs are tracked as GitHub issues. Search the list and try reproduce on demo before you create an issue. When you create an issue, please provide the following information by filling in the template.

Explain the problem and include additional details to help maintainers reproduce the problem:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible. Don't just say what you did, but explain how you did it. For example, if you moved the cursor to the end of a line, explain if you used a mouse or a keyboard.
- **Provide specific examples to demonstrate the steps.** Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets on the issue, use Markdown code blocks.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.

## Suggesting Enhancements

In case you want to suggest, please follow this guideline to help maintainers and the community understand your suggestion.
Before creating suggestions, please check [issue list](https://github.com/gs-shop/vue-slick-carousel/labels/enhancement) if there's already a request.

Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps.** Include copy/pasteable snippets which you use in those examples, as Markdown code blocks.
- **Include screenshots and animated GIFs** which helps demonstrate the steps or point out.
- **Explain why this enhancement would be useful** to users.

## First Code Contribution

Unsure where to begin contributing? You can start by looking through these `document`, `good first issue` and `help wanted` issues:

- **documentation issues**: issues which should be reviewed or improved.
- **good first issues**: issues which should only require a few lines of code, and a test or two.
- **help wanted issues**: issues which should be a bit more involved than beginner issues.

## Pull Requests

### Development WorkFlow

- Set up your development environment
- Be sure the code passes `yarn lint`, `yarn test`
- Make a pull request

### Development Environment

- Prepare your machine node and it's packages installed.
- Checkout our repository
- Install dependencies by `yarn`
- Start dev server for demo by `yarn serve`

### Make changes

#### Checkout a branch

- **master**: PR Base branch.

#### Check Code Style

Run `yarn lint` and make sure all the tests pass.

#### Test

Run `yarn test` and verify all the tests pass.
If you are adding new commands or features, they must include tests.
If you are changing functionality, update the tests if you need to.

#### Commit

Follow our [commit message conventions](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md).

### Yes! Pull request

Make your pull request, then describe your changes.

#### Title

Follow other PR title format on below.

```
    :gitmoji-type: short description (fix #111)
    :gitmoji-type: short description (fix #123, #111, #122)
    :gitmoji-type: short description (ref #111)
```

- use present tense: 'change' not 'changed' or 'changes'

#### Description

If it has related to issues, add links to the issues(like `#123`) in the description.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to kyuwoo.choi@gmail.com.

> This Guide is base on [tui.editor](https://github.com/nhn/tui.editor/blob/master/CONTRIBUTING.md), [atom](https://github.com/atom/atom/blob/master/CONTRIBUTING.md), [CocoaPods](http://guides.cocoapods.org/contributing/contribute-to-cocoapods.html) and [ESLint](http://eslint.org/docs/developer-guide/contributing/pull-requests)
