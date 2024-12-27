# Bitbucket Contributions

This directory contains the codebase for the Bitbucket contributions API. The API is responsible for fetching the Bitbucket contributions data and returning it to the client. Unlike the Github contributions API, the Bitbucket contributions API is generated manually.

## Getting Started

Run this command from inside the git repo directory to generate the Bitbucket contributions data. Replace the date range with the desired range.

```shell
git log --author="$(git config user.name)" --since="2025-01-01" --until="2025-12-31" --pretty=format:'{%n  "commit": "%H",%n  "date": "%ad"%n},' > 2025.json
```
