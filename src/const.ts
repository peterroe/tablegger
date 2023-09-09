import type { OptionType } from './type'

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

const singleLineBorderStyleMatrix: TableStylyMatrix = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', '-', '|', '-', ' '],
  ['', '', '', '', ''],
  [' ', ' ', '|', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
]

const doubleLineBorderStyleMatrix: TableStylyMatrix = [
  [' ', ' ', ' ', ' ', ' '],
  ['=', '=', '=', '=', '='],
  ['', '', '', '', ''],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
]

const horizontalLineBorderStyleMatrix: TableStylyMatrix = [
  ['─', '─', '─', '─', '─'],
  ['─', '─', '─', '─', '─'],
  ['', '', '', '', ''],
  [' ', ' ', ' ', ' ', ' '],
  ['─', '─', '─', '─', '─'],
]

const intersectBorderStyleMatrix: TableStylyMatrix = [
  ['+', '-', '+', '-', '+'],
  ['+', '-', '+', '-', '+'],
  ['', '', '', '', ''],
  ['|', ' ', '|', ' ', '|'],
  ['+', '-', '+', '-', '+'],
]

export interface ThemeType {
  matrix: TableStylyMatrix
  option?: OptionType
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
  singleLine: {
    matrix: singleLineBorderStyleMatrix,
  },
  doubleLine: {
    matrix: doubleLineBorderStyleMatrix,
  },
  horizontalLine: {
    matrix: horizontalLineBorderStyleMatrix,
  },
  intersect: {
    matrix: intersectBorderStyleMatrix,
  },
}
