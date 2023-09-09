import type { UserOptionType } from './type'

export type BorderArray = [string, string, string, string, string]

export type TableStylyMatrix = [
  BorderArray,
  BorderArray,
  BorderArray,
  BorderArray,
  BorderArray,
]

const borderStyleMatrix: TableStylyMatrix = [
  ['┌', '─', '┬', '─', '┐'],
  ['├', '─', '┼', '─', '┤'],
  ['├', '─', '┼', '─', '┤'],
  ['│', ' ', '│', ' ', '│'],
  ['└', '─', '┴', '─', '┘'],
]

const noBorderStyleMatrix: TableStylyMatrix = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
]

const hackerBorderStyleMatrix: TableStylyMatrix = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', '-', '|', '-', ' '],
  ['', '', '', '', ''],
  [' ', ' ', '|', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
]

const doubleLineBorderStyleMatrix: TableStylyMatrix = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', '-', '|', '-', ' '],
  ['', '', '', '', ''],
  [' ', ' ', '|', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
]

export interface ThemeType {
  matrix: TableStylyMatrix
  option?: UserOptionType
}

export interface DefaultThemeType {
  [key: string]: ThemeType
}

export const defaultThemes = {
  table: {
    matrix: borderStyleMatrix,
  },
  noBorder: {
    matrix: noBorderStyleMatrix,
  },
  hackerBorder: {
    matrix: hackerBorderStyleMatrix,
  },
  doubleLine: {
    matrix: doubleLineBorderStyleMatrix,
  },
}
