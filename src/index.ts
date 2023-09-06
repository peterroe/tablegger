import { defu } from 'defu'
import { consola } from 'consola'
import stringWidth from 'string-width'
import type { OptionType, PrimaryType, UserOptionType } from './type'
import { characterArrayToObject } from './utils'
const defaultOption: OptionType = {
  table: {
    theme: 'noBorder',
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
  private data: string[][] = [['']]
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
    while (this.data[this.i][this.j]) this.j++
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
    const { borderTop } = this.themeChars
    this.result += borderTop.left
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += borderTop.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += borderTop.intersection
    })
    this.result += `${borderTop.right}\n`
  }

  private addBorderRow() {
    const { cell: { paddingX } } = this.option
    const { borderMiddle } = this.themeChars
    this.result += borderMiddle.left
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += borderMiddle.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += borderMiddle.intersection
    })
    this.result += `${borderMiddle.right}\n`
  }

  private addPaddingYRow() {
    const { cell: { paddingX } } = this.option
    const { borderGap } = this.themeChars
    this.result += borderGap.left
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += borderGap.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += borderGap.intersection
    })
    this.result += `${borderGap.right}\n`
  }

  private addBorderFooter() {
    const { cell: { paddingX } } = this.option
    const { borderBottom } = this.themeChars
    this.result += borderBottom.left
    this.columnsWidth.map(column => column + paddingX * 2).forEach((column, index) => {
      this.result += borderBottom.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1)
        this.result += borderBottom.intersection
    })
    this.result += `${borderBottom.right}\n`
  }

  private get column() {
    return Math.max(...this.data.map(row => row.length))
  }

  private get themeChars() {
    return characterArrayToObject(this.option.table.theme)
  }

  private fillEmptyChar() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.column; j++) {
        if (this.data[i][j] === undefined)
          this.data[i][j] = ''
      }
    }
  }

  /**
   * Add table elements
   * @param words
   */
  public add(words: string | string[] = '') {
    if (!Array.isArray(words))
      this.push(words.toString())

    else
      words.forEach(word => this.push(word.toString()))

    return this
  }

  /**
   * Set table header
   * @param rowWords
   * @param colWords
   */
  public setHeaders(rowWords: PrimaryType[], colWords: PrimaryType[]) {
    this.setRowHeaders(rowWords)
      .setColHeaders(colWords)
    return this
  }

  /**
   * Set table row header
   * @param rowWords
   */
  public setRowHeaders(rowWords: PrimaryType[]) {
    this.data[0] = rowWords.map(it => it.toString())
    this.fillEmptyChar()
    return this
  }

  /**
   * Set table column header
   * @param colWords
   */
  public setColHeaders(colWords: string[]) {
    colWords.forEach((word, i) => {
      if (!this.data[i + 1])
        this.data[i + 1] = new Array(this.column).fill('')

      this.data[i + 1][0] = word
    })
    return this
  }

  /**
   * Add table row (Allow reset column)
   * @param colWords
   */
  public addRow(newRow: Array<string>) {
    this.data.push(newRow)
    this.i = this.data.length - 1
    this.j = newRow.length - 1
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

  public clearTable() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.column; j++)
        this.data[i][j] = ''
    }
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
    const { cell: { paddingY } } = this.option
    // Reset result
    this.result = ''
    // Get columnsWidth
    this.calcColumnsWidth()
    this.addBorderHeader()

    for (let i = 0; i < this.data.length; i++) {
      let t = 0
      while (t++ < paddingY) this.addPaddingYRow()

      this.result += this.themeChars.borderGap.left
      for (let j = 0; j < this.data[i].length; j++) {
        // insert paddingX gap before each word
        this.result += ' '.repeat(this.option.cell.paddingX)

        const rawWord = this.data[i][j]
        const pureWordLen = stringWidth(rawWord)
        const gapLen = this.columnsWidth[j] - pureWordLen

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
        // insert paddingX gap after each word
        this.result += ' '.repeat(this.option.cell.paddingX)

        if (j < this.data[i].length - 1) {
          this.result += this.themeChars.borderGap.intersection
          this.result += ' '.repeat(this.option.cell.gapX)
        }
      }
      this.result += this.themeChars.borderGap.right
      this.result += '\n'

      t = 0
      while (t++ < paddingY) this.addPaddingYRow()

      if (i < this.data.length - 1)
        this.addBorderRow()
    }
    // if (border)
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
    const effectWordLength = stringWidth(word)
    len = Math.max(len, effectWordLength)
  }
  return len
}
