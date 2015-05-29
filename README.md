# package-config [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> parse the closest `package.json` and get package specific configurations

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```sh
npm install --save package-config
```

## Usage

###### sample package.json
```json
{
  ...

  "config": {
    "my-pkg": {
      "foo": "bar"
    }
  },

  "settings": {
    "some-pkg": {
      "foo": "bar"
    }
  }

  ...
}
```

```js
// defaults to `package.config`
var config = require('package-config')()

// returns `package.config[my-pkg]`
var config = require('package-config')('my-pkg')

// returns fallback value
var config = require('package-config')('another-pkg', false, {
  foo: 'baz'
})

// returns `package.settings[some-pkg]`
var config = require('package-config')('some-pkg', {
  root: 'settings'
})

// returns `package.settings`
var config = require('package-config')('settings', {
  root: false
})
```

## API

### config(namespace[, options, fallback])

#### Arguments

| name        | description                                                               | default     |
| ----------- | ------------------------------------------------------------------------- | ----------- |
| `namespace` | property name in `package.json`, typically this will be your package name | `undefined` |
| `option`    | see [`options`](#options)                                                               |
| `fallback`  | fallback value                                                            | `undefined` |

#### Options

| name   | description                                    | default       |
| ------ | ---------------------------------------------- | ------------- |
| `root` | `package.json` object root                     | `config`      |
| `cwd`  | starting directory to look for `package.json`  | `process.cwd` |


## Support

Donations are welcome to help support the continuous development of this project.

[![Gratipay][gratipay-image]][gratipay-url]
[![PayPal][paypal-image]][paypal-url]
[![Flattr][flattr-image]][flattr-url]
[![Bitcoin][bitcoin-image]][bitcoin-url]

## License

[MIT](LICENSE) &copy; [Ahmad Nassri](https://www.ahmadnassri.com)

[license-url]: https://github.com/ahmadnassri/package-config/blob/master/LICENSE

[travis-url]: https://travis-ci.org/ahmadnassri/package-config
[travis-image]: https://img.shields.io/travis/ahmadnassri/package-config.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/package-config
[npm-license]: https://img.shields.io/npm/l/package-config.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/package-config.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/package-config.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/package-config
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/package-config.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/package-config.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/package-config
[david-image]: https://img.shields.io/david/ahmadnassri/package-config.svg?style=flat-square

[gratipay-url]: https://www.gratipay.com/ahmadnassri/
[gratipay-image]: https://img.shields.io/gratipay/ahmadnassri.svg?style=flat-square

[paypal-url]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UJ2B2BTK9VLRS&on0=project&os0=package-config
[paypal-image]: http://img.shields.io/badge/paypal-donate-green.svg?style=flat-square

[flattr-url]: https://flattr.com/submit/auto?user_id=ahmadnassri&url=https://github.com/ahmadnassri/package-config&title=package-config&language=&tags=github&category=software
[flattr-image]: http://img.shields.io/badge/flattr-donate-green.svg?style=flat-square

[bitcoin-image]: http://img.shields.io/badge/bitcoin-1Nb46sZRVG3or7pNaDjthcGJpWhvoPpCxy-green.svg?style=flat-square
[bitcoin-url]: https://www.coinbase.com/checkouts/ae383ae6bb931a2fa5ad11cec115191e?name=package-config
