/* eslint-disable no-console */
import p from 'picocolors'
import { Tablegger } from '../src/index'

const logger = new Tablegger({
  theme: 'singleLine',
  paddingRight: 4,
  gap: 1,
}).setColumn(3)

logger.add('Stage').add('Time').add('Rss')
  .add('Init').add(p.red('230.ms')).add('234ms')
  .add('Import').add('43ms')
console.log(logger.toString())

logger.setConfig({
  theme: 'table',
  gap: 0,
})
console.log(logger.toString())
logger.setConfig({
  theme: 'noBorder',
})
console.log(logger.toString())
logger.setConfig({
  theme: 'doubleLine',
})
console.log(logger.toString())

logger.setConfig({
  theme: 'intersect',
})
console.log(logger.toString())

logger.setConfig({
  theme: 'horizontalLine',
})
console.log(logger.toString())

logger.setConfig({
  title: {
    name: 'Hello World',
  },
})
console.log(logger.toString())

logger.setConfig({
  title: {
    name: 'Hello World',
    position: 'bottom',
  },
})
console.log(logger.toString())

logger.setConfig({
  theme: 'table',
  title: {
    name: p.blue('Hello World'),
    position: 'inline',
    indent: 1,
  },
})
console.log(logger.toString())

/**
┌───────┬┬┐
│Variety│││
└───────┴┴┘
*/

// logger.add('is')
// console.log(logger.toString())
// /**
// ┌───────┬──┬┐
// │Variety│is││
// └───────┴──┴┘
// */

// logger.add('the')
// console.log(logger.toString())
// /**
// ┌───────┬──┬───┐
// │Variety│is│the│
// └───────┴──┴───┘
// */

// logger.add('spice')
// console.log(logger.toString())
// /**
// ┌───────┬──┬───┐
// │Variety│is│the│
// ├───────┼──┼───┤
// │spice  │  │   │
// └───────┴──┴───┘
//  */

// logger.add('of')
// console.log(logger.toString())
// /**
// ┌───────┬──┬───┐
// │Variety│is│the│
// ├───────┼──┼───┤
// │spice  │of│   │
// └───────┴──┴───┘
//  */

// logger.add('life')
// console.log(logger.toString())
// /**
// ┌───────┬──┬────┐
// │Variety│is│the │
// ├───────┼──┼────┤
// │spice  │of│life│
// └───────┴──┴────┘
//  */

// // Overwrite existing string
// logger.set(1, 0, 'curse').setConfig({
//   cell: {
//     paddingX: 2,
//   },
// })
// console.log(logger.toString())
// /**
// ┌───────────┬──────┬────────┐
// │  Variety  │  is  │  the   │
// ├───────────┼──────┼────────┤
// │  curse    │  of  │  life  │
// └───────────┴──────┴────────┘
//  */

// console.log('========= reset =========')

// logger.clearTable()
// logger.setHeaders(['a','b','c','d', 'e'], ['a','b','c','d'])

// console.log(logger.toString())

// const tablegger = new Tablegger({
//   table: {
//     theme: 'table',
//   },
//   cell: {
//     gapX: 0,
//     paddingX: 2,
//     paddingY: 2,
//     align: 'center',
//   },
// }).setColumn(2)
// tablegger.add('name')
// tablegger.add('agssss3sse')
// tablegger.add(p.blue('hohhhbby'))
// tablegger.add(p.bold('take'))
// tablegger.add('why')
// tablegger.add(p.red('jjhh'))

// console.log(tablegger.toString())
