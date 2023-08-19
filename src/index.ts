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

  toString() {
    const { table: { column, border }, cell: { paddingX } } = this.option
    // Acturl width of each column (No conrol characters)
    for (let j = 0; j < column; j++) {
      // Collect each column word
      const columWords: string[] = []
      for (let i = 0; i < this.data.length; i++)
        columWords.push(this.data[i][j])
      // Calculate max word length from each column
      this.columnsWidth[j] = calcMaxEffectWordLength(columWords)
    }
    let result = ''
    if (border) {
      result += '┌'
      this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
        result += '─'.repeat(column)
        if (index < this.columnsWidth.length - 1)
          result += '┬'
      })
      result += '┐\n'
    }
    for (let i = 0; i < this.data.length; i++) {
      if (border)
        result += '│'

      for (let j = 0; j < this.data[i].length; j++) {
        // insert padding gap before each word
        result += ' '.repeat(this.option.cell.paddingX)

        const rawWord = this.data[i][j]
        const pureWord = cleanColor(rawWord)
        const gapLen = this.columnsWidth[j] - pureWord.length

        if (this.option.cell.align === 'right') {
          result = result + ' '.repeat(gapLen) + rawWord
        }
        else if (this.option.cell.align === 'left') {
          result = result + rawWord + ' '.repeat(gapLen)
        }
        else {
          const startLen = Math.floor(gapLen / 2)
          const endLen = gapLen - startLen
          result = result + ' '.repeat(startLen) + rawWord + ' '.repeat(endLen)
        }

        result += ' '.repeat(this.option.cell.paddingX)
        if (border)
          result += '│'
        if (j < this.data[j].length - 1)

          result += '│'.repeat(this.option.cell.gapX)
      }

      if (border && i < this.data.length - 1) {
        result += '\n├'
        this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
          result += '─'.repeat(column)
          if (index < this.columnsWidth.length - 1)
            result += '┼'
        })
        result += '┤'
      }

      if (i < this.data.length - 1)
        result += '\n'.repeat(this.option.cell.paddingY + 1)
    }
    if (border) {
      result += '\n└'
      this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
        result += '─'.repeat(column)
        if (index < this.columnsWidth.length - 1)
          result += '┴'
      })
      result += '┘\n'
    }
    console.log(result)
    return result
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
