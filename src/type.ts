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
   * The left margins of the cell
   * @default 0 (character)
   */
  paddingLeft?: number
  /**
   * The right margins of the cell
   * @default 0 (character)
   */
  paddingRight?: number
  /**
   * The top and bottom margins of the cell
   * @default 0 (line)
   */
  paddingY?: number
  /**
   * Left and right spacing of vertical borders
   * @default 0
   */
  gap?: number
  /**
   * Table title
   */
  title?: {
    name: string
    position?: 'top' | 'inline' | 'bottom'
    // If the value is not specified, it is the center
    indent?: number
  }
}

export type PrimaryType = string
