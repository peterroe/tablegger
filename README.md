## tablegger

For printing tabular structured data, optional configuration and automatic alignment.

## Feature

* 📦 Out-of-the-box control character support.
* ⚙️ Supports flexible configurations such as borders and paddings.
* 🤙🏻 Modify configuration anytime, anywhere.
* 🦾 TypeScript, of course.

## Try it now!

```bash
$ pnpm i tablegger
```

## Usage

**Basic usage**

```ts
import p from 'picocolors'
import { Tablegger } from 'tablegger'
const users = [
  { id: 1, name: 'John', age: 20 },
  { id: 2, name: 'Smithsonian', age: 24 },
  { id: 3, name: 'Bob', age: 27 },
  { id: 4, name: 'Alice', age: 30 },

]

const logger = new Tablegger({
  table: {
    border: true,
  },
  cell: {
    paddingY: 0,
    paddingX: 3,
  },
})

const header = Object.keys(users[0])

// Support any control characters
logger.setHeader(header.map(it => p.bold(p.green(it))))

users.forEach((user) => {
  header.forEach((key) => {
    logger.add(user[key])
  })
})

console.log(logger.toString())

/**
┌────────┬─────────────────┬─────────┐
│   id   │   name          │   age   │
├────────┼─────────────────┼─────────┤
│   1    │   John          │   20    │
├────────┼─────────────────┼─────────┤
│   2    │   Smithsonian   │   24    │
├────────┼─────────────────┼─────────┤
│   3    │   Bob           │   27    │
├────────┼─────────────────┼─────────┤
│   4    │   Alice         │   30    │
└────────┴─────────────────┴─────────┘
*/

// Override conifg(Auto merge)
logger.setConfig({
  cell: {
    align: 'center',
  },
})

console.log(logger.toString())

/**
┌────────┬─────────────────┬─────────┐
│   id   │      name       │   age   │
├────────┼─────────────────┼─────────┤
│   1    │      John       │   20    │
├────────┼─────────────────┼─────────┤
│   2    │   Smithsonian   │   24    │
├────────┼─────────────────┼─────────┤
│   3    │       Bob       │   27    │
├────────┼─────────────────┼─────────┤
│   4    │      Alice      │   30    │
└────────┴─────────────────┴─────────┘
*/

logger.setConfig({
  table: {
    border: false,
  },
  cell: {
    align: 'left',
    paddingX: 0,
    gapX: 5, // Only valid when table.border is false
  },
})

console.log(logger.toString())

/**
id     name            age
1      John            20
2      Smithsonian     24
3      Bob             27
4      Alice           30
*/
```

**Flexible**

Actually, You can insert any table element in any position

```ts
import { Tablegger } from '../src/index'

const logger = new Tablegger({
  table: {
    border: true,
    column: 3, // Set column
  },
  cell: {
  },
})

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
```

## Interface

```ts
export interface UserOptionType {
  table?: TableType
  cell?: CellType
}

export interface TableType {
  /**
   * Is need a border
   * @default true
   */
  border?: boolean
  /**
   * Must be init!
   * or use setHeader() method!
   * @default 3
   */
  column?: number
}

export interface CellType {
  /**
   * @default left
   */
  align?: 'left' | 'right' | 'center'
  /**
   * The left and right margins of the cell
   * @default 0 (character)
   */
  paddingX?: number
  /**
   * The top and bome margins of the cell
   * @default 0 (line)
   */
  paddingY?: number
  /**
   * Valid when table.border is `false`!
   * @default 0 (character)
   */
  gapX?: number
}
```