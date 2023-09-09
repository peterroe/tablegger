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
  ['', '', '', '', ''],
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
    option: {},
  },
  noBorder: {
    matrix: noBorderStyleMatrix,
    option: {},
  },
  singleLine: {
    matrix: singleLineBorderStyleMatrix,
    option: {
      gap: 1,
    },
  },
  doubleLine: {
    matrix: doubleLineBorderStyleMatrix,
    option: {},
  },
  horizontalLine: {
    matrix: horizontalLineBorderStyleMatrix,
    option: {},
  },
  intersect: {
    matrix: intersectBorderStyleMatrix,
    option: {},
  },
}
