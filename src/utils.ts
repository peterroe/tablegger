import { defaultThemes } from './const'
import type { BorderArray, TableStyleArrayTheme } from './const'

interface RowType {
  left: string
  horizontal: string
  intersection: string
  right: string
}

interface TableStyleType {
  borderTop: RowType
  borderMiddle: RowType
  borderGap: RowType
  borderBottom: RowType
}

export function characterArrayToObject(borderStyle: 'border' | 'noBorder' | TableStyleArrayTheme | BorderArray[]): TableStyleType {
  const matrix
    = typeof borderStyle === 'string' ? defaultThemes[borderStyle] : borderStyle

  return {
    borderTop: {
      left: matrix[0][0],
      horizontal: matrix[0][1],
      intersection: matrix[0][2],
      right: matrix[0][4],
    },
    borderGap: {
      left: matrix[1][0],
      horizontal: matrix[1][1],
      intersection: matrix[1][2],
      right: matrix[1][4],
    },
    borderMiddle: {
      left: matrix[2][0],
      horizontal: matrix[2][1],
      intersection: matrix[2][2],
      right: matrix[2][4],
    },
    borderBottom: {
      left: matrix[4][0],
      horizontal: matrix[4][1],
      intersection: matrix[4][2],
      right: matrix[4][4],
    },
  }
}
