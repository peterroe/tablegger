import { defu } from 'defu'
import { consola } from 'consola'
import stringWidth from 'string-width'
import p from 'picocolors'
import type { OptionType, PrimaryType, userOptionType } from './type'
import { characterArrayToObject, stringify } from './utils'
import { defaultThemes } from './const'

const defaultOption: Required<OptionType> = {
  theme: 'singleLine',
  cellPaddingLeft: 1,
  cellPaddingRight: 1,
  cellPaddingTop: 0,
  cellPaddingBottom: 0,
  align: 'left',
  gap: 0,
  caption: {
    name: '',
    position: 'top',
  },
  borderColorFn: p.gray,
}

export class Tablegger {
  private option: Required<OptionType>
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

  constructor(userOption?: userOptionType) {
    this.option = defu(deconstruct(userOption), defaultOption)
    // built-in option in theme
    if (userOption && typeof userOption.theme === 'string')
      this.option = defu(defaultThemes[userOption.theme].option, this.option)
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

  private addHeaderTopBorderRow() {
    const { cellPaddingLeft, cellPaddingRight, gap } = this.option
    const { borderTop } = this.themeChars
    this.result += borderTop.left
    this.columnsWidth.map(column => column + (cellPaddingLeft + cellPaddingRight)).forEach((column, index) => {
      this.result += borderTop.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1) {
        this.result += ' '.repeat(gap)
        this.result += borderTop.intersection
        this.result += ' '.repeat(gap)
      }
    })
    this.result += `${borderTop.right}\n`
  }

  private addBorderRow() {
    const { cellPaddingLeft, cellPaddingRight, gap } = this.option
    const { borderMiddle } = this.themeChars
    // no border if borderMiddle value is empty
    if (!Object.values(borderMiddle).filter(Boolean).length)
      return

    this.result += borderMiddle.left
    // this.result += ' '.repeat(gapX)
    this.columnsWidth.map(column => column + (cellPaddingLeft + cellPaddingRight)).forEach((column, index) => {
      this.result += borderMiddle.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1) {
        this.result += ' '.repeat(gap)
        this.result += borderMiddle.intersection
        this.result += ' '.repeat(gap)
      }
    })
    this.result += `${borderMiddle.right}\n`
  }

  private addHeaderBottomBorderRow() {
    const { cellPaddingLeft, cellPaddingRight, gap } = this.option
    const { borderSep } = this.themeChars
    this.result += borderSep.left
    // this.result += ' '.repeat(gapX)
    this.columnsWidth.map(column => column + (cellPaddingLeft + cellPaddingRight)).forEach((column, index) => {
      this.result += borderSep.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1) {
        this.result += ' '.repeat(gap)
        this.result += borderSep.intersection
        this.result += ' '.repeat(gap)
      }
    })
    this.result += `${borderSep.right}\n`
  }

  private addPaddingYRow() {
    const { cellPaddingLeft, cellPaddingRight, gap } = this.option
    const { borderGap } = this.themeChars
    this.result += borderGap.left
    this.columnsWidth.map(column => column + (cellPaddingLeft + cellPaddingRight)).forEach((column, index) => {
      this.result += borderGap.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1) {
        this.result += ' '.repeat(gap)
        this.result += borderGap.intersection
        this.result += ' '.repeat(gap)
      }
    })
    this.result += `${borderGap.right}\n`
  }

  private addBorderFooterRow() {
    const { cellPaddingLeft, cellPaddingRight, gap } = this.option
    const { borderBottom } = this.themeChars
    this.result += borderBottom.left
    this.columnsWidth.map(column => column + (cellPaddingLeft + cellPaddingRight)).forEach((column, index) => {
      this.result += borderBottom.horizontal.repeat(column)
      if (index < this.columnsWidth.length - 1) {
        this.result += ' '.repeat(gap)
        this.result += borderBottom.intersection
        this.result += ' '.repeat(gap)
      }
    })
    this.result += `${borderBottom.right}\n`
  }

  private get column() {
    return Math.max(...this.data.map(row => row.length))
  }

  private get themeChars() {
    return characterArrayToObject(this.option.theme, this.option.borderColorFn)
  }

  private fillEmptyChar() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.column; j++) {
        if (this.data[i][j] === undefined)
          this.data[i][j] = ''
      }
    }
  }

  private setCaption(result: string) {
    const { name, position, indent } = this.option.caption
    const { borderColorFn } = this.option
    if (!name)
      return result

    const len = (() => {
      const allColumnsLen = this.columnsWidth.reduce((pre, cur) => pre + cur, 0)
      const paddingsLen = this.columnsWidth.length * (this.option.cellPaddingLeft + this.option.cellPaddingRight)
      const gapsLen = this.columnsWidth.length * 2 - 2
      return allColumnsLen + paddingsLen + gapsLen
    })()
    const pureLen = stringWidth(name)
    const restLen = len - pureLen

    const leftLen = typeof indent === 'number' ? indent : Math.floor(restLen / 2)
    if (position === 'top') {
      const rightLen = len - leftLen
      return `${' '.repeat(leftLen) + name + ' '.repeat(rightLen)}\n${result}`
    }
    else if (position === 'bottom') {
      const rightLen = len - leftLen
      return `${result}${' '.repeat(leftLen) + name + ' '.repeat(rightLen)}`
    }
    else if (position === 'inline') {
      // consider color
      const singleColorCharLen = borderColorFn(' ').length
      return `${result.slice(0, leftLen * singleColorCharLen) + name + result.slice((leftLen + pureLen) * singleColorCharLen)}`
    }
  }

  /**
   * Add table elements
   * @param words
   */
  public add(words: string | string[] = '') {
    if (!Array.isArray(words))
      this.push(stringify(words))

    else
      words.map(stringify).forEach(word => this.push(word))

    return this
  }

  /**
   * Set table header
   * @param rowWords
   * @param colWords
   */
  public setHeaders(rowWords: PrimaryType[], colWords: PrimaryType[]) {
    this.setRowHeaders(rowWords.map(stringify))
      .setColHeaders(colWords.map(stringify))
    return this
  }

  /**
   * Set table row header
   * @param rowWords
   */
  public setRowHeaders(rowWords: PrimaryType[]) {
    this.data[0] = rowWords.map(stringify)
    this.fillEmptyChar()
    return this
  }

  /**
   * Set table column header
   * @param colWords
   */
  public setColHeaders(colWords: PrimaryType[]) {
    colWords.forEach((word, i) => {
      if (!this.data[i + 1])
        this.data[i + 1] = new Array(this.column).fill('')

      this.data[i + 1][0] = stringify(word)
    })
    return this
  }

  /**
   * Add table row (Allow reset column)
   * @param colWords
   */
  public addRow(newRow: Array<PrimaryType>) {
    this.data.push(newRow.map(stringify))
    this.fillEmptyChar()
    this.i = this.data.length - 1
    this.j = newRow.length - 1
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
  public set(i: number, j: number, word: PrimaryType) {
    if (i > this.i || j > this.j)
      consola.error(`Invalid parameters, i must be less than or equal to ${this.i}, and j must be greater than or equal to ${this.j}`)

    this.data[i][j] = stringify(word)
    return this
  }

  /**
   * Override config
   * @param option
   */
  public setConfig(userOption?: userOptionType) {
    this.option = defu(deconstruct(userOption), this.option)
    return this
  }

  /**
   * Keep table cells, But clear content
   */
  public clearTable() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.column; j++)
        this.data[i][j] = ''
    }
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
    const { cellPaddingTop, cellPaddingBottom, gap } = this.option
    // Reset result
    this.result = ''
    // Get columnsWidth
    this.calcColumnsWidth()
    this.addHeaderTopBorderRow()

    for (let i = 0; i < this.data.length; i++) {
      let t = 0
      while (t++ < cellPaddingTop) this.addPaddingYRow()
      this.result += this.themeChars.borderGap.left

      for (let j = 0; j < this.data[i].length; j++) {
        // insert cellPaddingX gap before each word
        this.result += ' '.repeat(this.option.cellPaddingLeft)

        const rawWord = this.data[i][j]
        const pureWordLen = stringWidth(rawWord)
        const gapLen = this.columnsWidth[j] - pureWordLen

        if (this.option.align === 'right') {
          this.result = this.result + ' '.repeat(gapLen) + rawWord
        }
        else if (this.option.align === 'left') {
          this.result = this.result + rawWord + ' '.repeat(gapLen)
        }
        else {
          const startLen = Math.floor(gapLen / 2)
          const endLen = gapLen - startLen
          this.result = this.result + ' '.repeat(startLen) + rawWord + ' '.repeat(endLen)
        }
        // insert cellPaddingX gap after each word
        this.result += ' '.repeat(this.option.cellPaddingRight)

        if (j < this.data[i].length - 1) {
          this.result += ' '.repeat(gap)
          this.result += this.themeChars.borderGap.intersection
          this.result += ' '.repeat(gap)
        }
      }

      this.result += this.themeChars.borderGap.right
      this.result += '\n'

      t = 0
      while (t++ < cellPaddingBottom) this.addPaddingYRow()

      if (i < this.data.length - 1) {
        if (i === 0)
          this.addHeaderBottomBorderRow()

        else
          this.addBorderRow()
      }
    }
    this.addBorderFooterRow()
    // set caption for table
    return this.setCaption(this.result)
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

function deconstruct(userOption?: userOptionType) {
  const { cellPaddingX, cellPaddingY, cell, ...rest } = userOption || {}
  rest.cellPaddingLeft = cellPaddingX || cell?.padding?.left
  rest.cellPaddingRight = cellPaddingX || cell?.padding?.right
  rest.cellPaddingTop = cellPaddingY || cell?.padding?.top
  rest.cellPaddingBottom = cellPaddingY || cell?.padding?.bottom
  return rest
}
