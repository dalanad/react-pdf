# How to publish to GitHub NPM registry

## 1. Make sure to run `lerna bootstrap`

## 2. Configure the Github registry.

- Create the `.npmrc` file in project root
- Add following config to it.

        registry=https://npm.pkg.github.com
        //npm.pkg.github.com/:_authToken=<TOKEN>

* Replace the `<TOKEN>` with your github personal access token (`PAT`) generated from Github account

## 3. Run `lerna publish`

- This will build the packages and push them to the configured github NPM registry.

# How to install packages from GitHub NPM registry

## 1.Add `.npmrc` file to the project

- Add following config to it.
  @paladin-analytics:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:\_authToken=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
- Then install `yarn add @paladin-analytics/renderer`
