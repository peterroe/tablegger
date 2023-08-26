import { defu } from 'defu'
import { consola } from 'consola'
import type { OptionType, PrimaryType, UserOptionType } from './type'
const defaultOption: OptionType = {
  table: {
    border: false,
  },
  cell: {
    paddingX: 0,
    paddingY: 0,
    align: 'left',
    gapX: 0,
  },
}

export class Tablegger {
  private option: OptionType
  /**
   * User's data source
   */
  private data: string[][] = [[]]
  /**
   * Current row index
   */
  private i = 0
  /**
   * Current column index
   */
  private j = 0
  /**
   * Maximum valid character width for each column
   */
  private columnsWidth: number[] = []
  /**
   * Output result
   */
  private result = ''
  /**
   * Columns for table
   * Must be set by `SetColumn` or `SetHeader`
   * @default 3
   */
  private column = 3

  constructor(option?: Partial<UserOptionType>) {
    this.option = defu(option, defaultOption)
  }

  private push(word: string) {
    // Auto Wrap if current column is full
    if (this.j >= this.column) {
      this.i++
      this.j = 0
      this.data.push(new Array(this.column).fill(''))
    }
    // Inset word to data
    this.data[this.i][this.j] = word
    this.j++
  }

  private calcColumnsWidth() {
    for (let j = 0; j < this.column; j++) {
      // Collect each column word
      const columWords: string[] = []
      for (let i = 0; i < this.data.length; i++)
        columWords.push(this.data[i][j])
      // Calculate max word length from each column
      this.columnsWidth[j] = calcMaxEffectWordLength(columWords)
    }
  }

  private addBorderHeader() {
    const { cell: { paddingX } } = this.option
    this.result += '┌'
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += '─'.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += '┬'
    })
    this.result += '┐\n'
  }

  private addBorderRow() {
    const { cell: { paddingX } } = this.option
    this.result += '├'
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += '─'.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += '┼'
    })
    this.result += '┤\n'
  }

  private addPaddingYRow() {
    const { table: { border }, cell: { paddingX } } = this.option
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

  private addBorderFooter() {
    const { cell: { paddingX } } = this.option
    this.result += '└'
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += '─'.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += '┴'
    })
    this.result += '┘\n'
  }

  /**
   * Add table elements
   * @param words
   */
  public add(words: PrimaryType | PrimaryType[] = '') {
    if (!Array.isArray(words))
      this.push(words.toString())

    else
      words.forEach(word => this.push(word.toString()))

    return this
  }

  /**
   * Set table header
   * @param words
   */
  public setHeader(words: PrimaryType[]) {
    this.column = words.length
    this.add(words)
    return this
  }

  /**
   * Set the number of table columns
   * @param column
   */
  public setColumn(column: number) {
    this.data = new Array(
      new Array(column).fill(''),
    )
    this.columnsWidth = new Array(column)
    return this
  }

  /**
   * Modify data at a location
   * @param i Abscissa
   * @param j Ordinate
   * @param word your data
   */
  public set(i: number, j: number, word: string) {
    if (i > this.i || j > this.j)
      consola.error(`Invalid parameters, i must be less than or equal to ${this.i}, and j must be greater than or equal to ${this.j}`)

    this.data[i][j] = word
    return this
  }

  /**
   * Override config
   * @param option
   */
  public setConfig(option?: Partial<UserOptionType>) {
    this.option = defu(option, this.option)
    return this
  }

  /**
   * Get raw data
   */
  public get rawData() {
    return this.data
  }

  /**
   * Generate result
   */
  public toString() {
    const { table: { border }, cell: { paddingY } } = this.option
    // Reset result
    this.result = ''
    // Get columnsWidth
    this.calcColumnsWidth()
    if (border)
      this.addBorderHeader()

    for (let i = 0; i < this.data.length; i++) {
      let t = 0
      while (t++ < paddingY) this.addPaddingYRow()

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
        if (j < this.data[i].length - 1)
          this.result += ' '.repeat(this.option.cell.gapX)
      }
      this.result += '\n'

      t = 0
      while (t++ < paddingY) this.addPaddingYRow()

      if (border && i < this.data.length - 1)
        this.addBorderRow()
    }
    if (border)
      this.addBorderFooter()

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
function cleanColor(str: string) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\u001B\[[0-9;]*m/g, '')
}
