export interface UserOptionType {
  table?: TableType
  cell?: CellType
}

export interface TableType {
  /**
   * Is need a border
   * @default true
   */
  border?: boolean
  /**
   * The number of columns in the table
   */
  column?: number
}

export interface CellType {
  /**
   * @default center
   */
  align?: 'left' | 'right' | 'center'
  /**
   * The left and right margins of the cell
   * @default 0 (character)
   */
  paddingX?: number
  /**
   * The top and bome margins of the cell
   * @default 0 (line)
   */
  paddingY?: number
  /**
   * Valid when table.border is `false`!
   * @default 0
   */
  gapX?: number
}

export interface OptionType extends UserOptionType {
  table: Required<TableType>
  cell: Required<CellType>
}

export type PrimaryType = string | number | boolean
