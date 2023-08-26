/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { Tablegger } from '../src/index'

const logger = new Tablegger({
  table: {
    border: true,
  },
  cell: {
  },
}).setColumn(3)

logger.add('Variety')
console.log(logger.toString())
/**
┌───────┬┬┐
│Variety│││
└───────┴┴┘
*/

logger.add('is')
console.log(logger.toString())
/**
┌───────┬──┬┐
│Variety│is││
└───────┴──┴┘
*/

logger.add('the')
console.log(logger.toString())
/**
┌───────┬──┬───┐
│Variety│is│the│
└───────┴──┴───┘
*/

logger.add('spice')
console.log(logger.toString())
/**
┌───────┬──┬───┐
│Variety│is│the│
├───────┼──┼───┤
│spice  │  │   │
└───────┴──┴───┘
 */

logger.add('of')
console.log(logger.toString())
/**
┌───────┬──┬───┐
│Variety│is│the│
├───────┼──┼───┤
│spice  │of│   │
└───────┴──┴───┘
 */

logger.add('life')
console.log(logger.toString())
/**
┌───────┬──┬────┐
│Variety│is│the │
├───────┼──┼────┤
│spice  │of│life│
└───────┴──┴────┘
 */

// Overwrite existing string
logger.set(1, 0, 'curse').setConfig({
  cell: {
    paddingX: 2,
  },
})
console.log(logger.toString())
/**
┌───────────┬──────┬────────┐
│  Variety  │  is  │  the   │
├───────────┼──────┼────────┤
│  curse    │  of  │  life  │
└───────────┴──────┴────────┘
 */


logger.set(3,2,' 23')