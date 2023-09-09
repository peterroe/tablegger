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
   * The left and right margins of the cell
   * @default 0 (character)
   */
  paddingX?: number
  paddingLeft?: number
  paddingRight?: number
  /**
   * The top and bome margins of the cell
   * @default 0 (line)
   */
  paddingY?: number
  /**
   * Valid when table.border is `false`!
   * @default 0
   */
  gap?: number
}

export type PrimaryType = string
