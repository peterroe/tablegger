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

export interface userOptionType extends OptionType {
  cellPaddingY?: number
  cellPaddingX?: number
  cell?: {
    padding?: {
      x: number
      y: number
      left: number
      top: number
      right: number
      bottom: number
    }
  }
}

// Type

export type ArrayType = Array<PrimaryType>
export type TwoArrayType = Array<ArrayType>
export interface ObjectType { [i: string]: PrimaryType }
export interface TwoObjectType { [i: string]: ObjectType }
export type ObjectArrayType = Array<ObjectType>

export type tableDataType = ArrayType
| TwoArrayType
| ObjectType
| TwoObjectType
| ObjectArrayType
