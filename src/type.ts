import type { Formatter } from 'picocolors/types'
import type { ThemeType, defaultThemes } from './const'

export type themeType = keyof typeof defaultThemes | ThemeType
export interface OptionType {
  /**
   * Is need a border
   * @default noBorder
   */
  theme?: themeType
  /**
   * @default center
   */
  align?: 'left' | 'right' | 'center'
  /**
   * The left padding of the cell
   * @default 0 (character)
   */
  cellPaddingLeft?: number
  /**
   * The right padding of the cell
   * @default 0 (character)
   */
  cellPaddingRight?: number
  /**
   * The top padding of the cell
   * @default 0 (character)
   */
  cellPaddingTop?: number
  /**
   * The bottom padding of the cell
   * @default 0 (character)
   */
  cellPaddingBottom?: number
  /**
   * Left and right spacing of vertical borders
   * @default 0
   */
  gap?: number
  /**
   * Table caption
   */
  caption?: {
    name: string
    position?: 'top' | 'inline' | 'bottom'
    // If the value is not specified, it is the center
    indent?: number | string
  }
  borderColorFn?: Formatter
}

export type PrimaryType = any
