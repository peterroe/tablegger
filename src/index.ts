import { defu } from 'defu'
import type { OptionType, UserOptionType } from './type'

const defaultOption: OptionType = {
  table: {
    border: false,
    column: 3,
  },
  cell: {
    paddingX: 0,
    paddingY: 0,
    align: 'left',
    width: 20,
    gapX: 4,
  },
}

export class NTLog {
  option: OptionType
  /**
   * User's data source
   */
  data: string[][]
  /**
   * Current row index
   */
  i = 0
  /**
   * Current column index
   */
  j = 0
  columnsWidth: number[]
  /**
   * Output result
   */
  result = ''
  constructor(option?: Partial<UserOptionType>) {
    this.option = defu(option, defaultOption)
    const { table: { column } } = this.option
    this.data = new Array(
      new Array(column).fill(''),
    )
    this.columnsWidth = new Array(column)
  }

  push(word: string) {
    const { table: { column } } = this.option
    // Auto Wrap if current column is full
    if (this.j >= column) {
      this.i++
      this.j = 0
      this.data.push(new Array(column).fill(''))
    }
    // Inset word to data
    this.data[this.i][this.j] = word
    this.j++
  }

  replace(i: number, j: number, word: string) {
    this.data[i][j] = word
  }

  get maxRowLength() {
    const { table: { column } } = this.option
    const maxRowWordsLength = this.columnsWidth.reduce((pre, cur) => {
      return pre + cur
    }, 0)
    const gapAndPaddingLength
      = (column - 1) * this.option.cell.gapX
      + column * this.option.cell.paddingX * 2
    return maxRowWordsLength + gapAndPaddingLength
  }

  calcColumnsWidth() {
    const { table: { column } } = this.option
    for (let j = 0; j < column; j++) {
      // Collect each column word
      const columWords: string[] = []
      for (let i = 0; i < this.data.length; i++)
        columWords.push(this.data[i][j])
      // Calculate max word length from each column
      this.columnsWidth[j] = calcMaxEffectWordLength(columWords)
    }
  }

  addPaddingY() {

  }

  addBorderHeader() {
    const { cell: { paddingX } } = this.option
    this.result += '┌'
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += '─'.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += '┬'
    })
    this.result += '┐\n'
  }

  addBorderRow() {
    const { cell: { paddingX } } = this.option
    this.result += '├'
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += '─'.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += '┼'
    })
    this.result += '┤\n'
  }

  addPaddingYRow() {
    const { table: { border }, cell: { paddingY, paddingX } } = this.option
    if (border) {
      this.result += '│'
      this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
        this.result += ' '.repeat(column)
        if (index < this.columnsWidth.length - 1)
          this.result += '│'
      })
      this.result += '│\n'
    }
    else {
      this.result += '\n'.repeat(this.option.cell.paddingY)
    }
  }

  addBorderFooter() {
    const { cell: { paddingX } } = this.option
    this.result += '└'
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += '─'.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += '┴'
    })
    this.result += '┘\n'
  }

  toString() {
    const { table: { column, border }, cell: { paddingX } } = this.option
    // Reset result
    this.result = ''
    // Get columnsWidth
    this.calcColumnsWidth()
    if (border)
      this.addBorderHeader()

    for (let i = 0; i < this.data.length; i++) {
      this.addPaddingYRow()
      if (border)
        this.result += '│'

      for (let j = 0; j < this.data[i].length; j++) {
        // insert padding gap before each word
        this.result += ' '.repeat(this.option.cell.paddingX)

        const rawWord = this.data[i][j]
        const pureWord = cleanColor(rawWord)
        const gapLen = this.columnsWidth[j] - pureWord.length

        if (this.option.cell.align === 'right') {
          this.result = this.result + ' '.repeat(gapLen) + rawWord
        }
        else if (this.option.cell.align === 'left') {
          this.result = this.result + rawWord + ' '.repeat(gapLen)
        }
        else {
          const startLen = Math.floor(gapLen / 2)
          const endLen = gapLen - startLen
          this.result = this.result + ' '.repeat(startLen) + rawWord + ' '.repeat(endLen)
        }

        this.result += ' '.repeat(this.option.cell.paddingX)
        if (border)
          this.result += '│'

        if (j < this.data[j].length - 1)
          this.result += '@'.repeat(this.option.cell.gapX)
      }
      if (border)
        this.result += '\n'

      this.addPaddingYRow()
      if (border && i < this.data.length - 1)
        this.addBorderRow()
      else if (!border)
        this.result += '\n'
    }
    if (border)
      this.addBorderFooter()

    console.log(this.result)
    return this.result
  }
}

/**
 * Calculates the max effect word length
 * (No control characters)
 */
function calcMaxEffectWordLength(rawWords: string[]) {
  let len = 0
  for (const word of rawWords) {
    const effectWordLength = cleanColor(word).length
    len = Math.max(len, effectWordLength)
  }
  return len
}

/**
 * Cleans the control characters from the word
 * @param str
 * @returns
 */
export function cleanColor(str: string) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\u001B\[[0-9;]*m/g, '')
}
