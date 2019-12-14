# Commit Message Convention

## Fundamental Guide

We love the great [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) guide from Chris Beams.
Fundamentally, write a commit message according to the guide.

## Commit Message Format

```
:gitmoji-type: a subject as a short description (#123, #234)

Logger description here if necessary

BREAKING CHANGE: if this commit breaks something

close: #123
ref: #234
```

- Any line of the commit message cannot be longer 100 characters!

## Type With [Gitmoji](https://gitmoji.carloscuesta.me/)

Must have an gitmoji for your commit type.
Below are some of the commonly used gitmoji.
Find the whole type in [gitmoji](https://gitmoji.carloscuesta.me/).

- :sparkles: Introducing new features.
- :bug: Fixing a bug.
- :pencil: Writing docs.
- :art: Improving structure / format of the code.
- :wrench: Changing configuration files.
- :white_check_mark: Updating tests.

## Subject

- must explain why. The code explains how it behaves.
- use the imperative, **present** tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end
- reference GitHub issues at the end. `(#123, #234)`

## Body

- use the imperative, **present** tense: "change" not "changed" nor "changes".
- the motivation for the change and contrast this with previous behavior.

## BREAKING CHANGE

- This commit contains breaking change(s).
- must type :boom: in commit title.
- start description with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

This convention is based on [tui.editor](https://github.com/nhn/tui.editor/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md), [AngularJS](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) and [ESLint](https://eslint.org/docs/developer-guide/contributing/pull-requests#step2)
