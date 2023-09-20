import type { Formatter } from 'picocolors/types'
import { defaultThemes } from './const'
import type { themeType } from './type'
import type { ArrayType, ObjectArrayType, ObjectType, TwoArrayType } from '.'

interface RowType {
  left: string
  horizontal: string
  intersection: string
  right: string
}

interface TableStyleType {
  borderTop: RowType
  borderSep: RowType
  borderMiddle: RowType
  borderGap: RowType
  borderBottom: RowType
}

export function characterArrayToObject(borderStyleTheme: themeType, borderColorFn: Formatter): TableStyleType {
  const rawMatrix
    = typeof borderStyleTheme !== 'object' ? defaultThemes[borderStyleTheme].matrix : borderStyleTheme.matrix

  const matrix = rawMatrix.map(row => row.map(item => item ? borderColorFn(item) : item))
  return {
    borderTop: {
      left: matrix[0][0],
      horizontal: matrix[0][1],
      intersection: matrix[0][2],
      right: matrix[0][4],
    },
    borderSep: {
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
    borderGap: {
      left: matrix[3][0],
      horizontal: matrix[3][1],
      intersection: matrix[3][2],
      right: matrix[3][4],
    },
    borderBottom: {
      left: matrix[4][0],
      horizontal: matrix[4][1],
      intersection: matrix[4][2],
      right: matrix[4][4],
    },
  }
}

export function stringify(value: any) {
  return typeof value === 'string' ? value : JSON.stringify(value)
}

export function isArray(value: any): value is ArrayType {
  return Array.isArray(value)
}

export function is2DArray(value: any): value is TwoArrayType {
  return isArray(value) && value.every(isArray)
}

export function isObject(value: any): value is ObjectType {
  return value instanceof Object
}

export function isObjectArray(value: any): value is ObjectArrayType {
  return isArray(value) && value.every(isObject)
}

export function notUndefined(value: any) {
  return value !== undefined
}
