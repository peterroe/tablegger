export interface UserOptionType {
  table?: TableType
  cell?: CellType
}

export interface TableType {
  /**
   * @default true
   */
  border?: boolean
  column?: number
}

export interface CellType {
  /**
   * @default center
   */
  align?: 'left' | 'right' | 'center'
  /**
   * valid when align is equal to center
   * @default 10
   */
  paddingX?: number
  /**
   * valid when align is't equals to center
   * @default 20
   */
  width?: number
  /**
   * @default 0
   */
  gapX?: number
}

export interface OptionType extends UserOptionType {
  table: Required<TableType>
  cell: Required<CellType>
}
