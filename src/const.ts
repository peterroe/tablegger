export type BorderArray = [string, string, string, string, string]

export type TableStyleArrayTheme = [
  BorderArray,
  BorderArray,
  BorderArray,
  BorderArray,
  BorderArray,
]

const borderStyle: TableStyleArrayTheme = [
  ['┌', '─', '┬', '─', '┐'],
  ['│', ' ', '│', ' ', '│'],
  ['├', '─', '┼', '─', '┤'],
  ['│', ' ', '│', ' ', '│'],
  ['└', '─', '┴', '─', '┘'],
]

const noBorderStyle = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
]

export const defaultThemes = {
  border: borderStyle,
  noBorder: noBorderStyle,
}
