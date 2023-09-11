## tablegger

For printing tabular structured data, optional configuration and automatic alignment.

## Feature

* 📦 Out-of-the-box ANSI code support.
* ⚙️ Supports flexible configurations such as borders and paddings.
* 🔧 Automatic alignment.
* 🤙🏻 Modify configuration anytime, anywhere.
* 🦾 TypeScript, of course.

## Try it now!

```bash
$ pnpm i tablegger
```

## Usage

```ts
import { Tablegger } from 'tablegger'

const logger = new Tablegger({
  theme: 'table',
}).setRowHeaders(['Stage', 'Time', 'Rss', 'HeapTotal', 'HeapUsed'])

logger.addRow(['Init', '0ms', '38 MiB', '6.08 MiB', '5.12 MiB'])
logger.addRow(['Import', '4.7ms', '+9.63 MiB', '+4.77 MiB', '+4.77 MiB'])
logger.addRow(['Called', '7.24ms', '+0 Byte', '+0 Byte', '+792 Bytes'])

console.log('table theme:')
console.log(logger.toString())

// Change Config anywhere, anyTime
logger.setConfig({
  theme: 'horizontalLine',
})
console.log('horizontalLine theme:')
console.log(logger.toString())

logger.setConfig({
  theme: 'doubleLine',
})
console.log('doubleLine theme:')
console.log(logger.toString())
```

<img src="https://tablegger.vercel.app/images/themes.png"/>

[Read the documentation](https://tablegger.vercel.app) for more information