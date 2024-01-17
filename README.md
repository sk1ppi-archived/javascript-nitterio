# @sk1ppi/js-nitter-scraper

![Made by](https://img.shields.io/badge/SK1PPI-8A2BE2)
![GitHub License](https://img.shields.io/github/license/sk1ppi/js_nitter_scraper)
![NPM Version](https://img.shields.io/npm/v/@sk1ppi/js_nitter_scraper)

This package is an example scraper for fetching tweets from [nitter.net](https://nitter.net/). It is written in JavaScript and uses [axios](https://www.npmjs.com/package/axios) and [cheerio](https://www.npmjs.com/package/cheerio) to fetch and parse the HTML.


## Install

To install the package, use the following command:


```shell
npm i @sk1ppi/js-nitter-scraper
```

## Example

To use the package, use the following code example:

```js
const { getLatestTweetsByUsername } = require('@sk1ppi/js-nitter-scraper')

async function main () {
 const tweets = await getLatestTweetsByUsername('sk1ppi_)
}
```

## Testing

To run tests, use the following command:

```shell
npm run test
```

## Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Reach out

![image0_0-3](https://github.com/sk1ppi/cardano_nami_wallet_recovery/assets/121653522/4dc2f3ff-a082-45fb-80de-d3a32bea18ae)

- [Via e-mail](mailto:kcxyzxyz@icloud.com?subject=Reaching%20out!)

## License

[Apache-2.0](LICENSE)