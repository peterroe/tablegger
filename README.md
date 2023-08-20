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
const header = Object.keys(users[0])

const logger = new Tablegger({
  table: {
    border: true,
  },
  cell: {
    paddingX: 3,
  },
// Support any control characters
}).setHeader(header.map(it => p.bold(p.green(it))))

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
  },
  cell: {
  },
}).setColumn(3) // Set column

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
interface UserOptionType {
  table?: TableType
  cell?: CellType
}
interface TableType {
  /**
   * Is need a border
   * @default true
   */
  border?: boolean
}
interface CellType {
  /**
   * @default center
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
   * @default 0
   */
  gapX?: number
}
type PrimaryType = string | number | boolean

declare class Tablegger {
  constructor(option?: Partial<UserOptionType>)
  /**
   * Add table elements
   * @param words
   */
  add(words?: PrimaryType | PrimaryType[]): this
  /**
   * Set table header
   * @param words
   */
  setHeader(words: PrimaryType[]): this
  /**
   * Set the number of table columns
   * @param column
   */
  setColumn(column: number): this
  /**
   * Modify data at a location
   * @param i Abscissa
   * @param j Ordinate
   * @param word your data
   */
  set(i: number, j: number, word: string): this
  /**
   * Override config
   * @param option
   */
  setConfig(option?: Partial<UserOptionType>): this
  /**
   * Get raw data
   */
  get rawData(): string[][]
  /**
   * Generate result
   */
  toString(): string
}

export { Tablegger }
```