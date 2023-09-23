import defu from 'defu'
import p from 'picocolors'
import { is2DArray, is2DObject, isArray, isObject, isObjectArray } from './utils'
import type { ArrayType, OptionType, tableDataType, userOptionType } from './type'
import { Tablegger } from './Tablegger'

export function table(data: tableDataType, column?: ArrayType, userOption?: userOptionType) {
  const logger = new Tablegger(defu(userOption, {
    theme: 'intersect',
    cellPaddingX: 2,
  } as OptionType))

  if (is2DArray(data)) {
    const maxLen = Math.max(...data.map(it => it.length))
    logger.setRowHeaders([
      '(index)',
      ...new Array(maxLen).fill('').map((_, i) => i),
    ].map(p.bold).map(p.cyan))

    data.forEach((it, i) => {
      logger.addRow([p.cyan(p.bold(i)), ...it])
    })

    // eslint-disable-next-line no-console
    console.log(logger.toString())
  }
  else if (isObjectArray(data)) {
    const keyList = new Set()
    data.map(Object.keys).forEach(it => it.forEach(t => keyList.add(t)))
    const keys = [...keyList].filter(key => column ? column.includes(key) : true) as any[]

    logger.setRowHeaders([
      '(index)',
      ...keys,
    ].map(p.bold).map(p.cyan))

    data.forEach((it, i) => {
      logger.addRow([p.cyan(p.bold(i)), ...keys.map(key => it[key])])
    })

    // eslint-disable-next-line no-console
    console.log(logger.toString())
  }
  else if (is2DObject(data)) {
    const itemkeyList = new Set()
    const columns = Object.keys(data)
    const values = Object.values(data)
    values.map(Object.keys).forEach(it => it.forEach(t => itemkeyList.add(t)))
    const keys = [...itemkeyList].filter(key => column ? column.includes(key) : true) as any[]

    logger.setRowHeaders([
      '(index)',
      ...keys,
    ].map(p.bold).map(p.cyan))

    values.forEach((it, i) => {
      logger.addRow([p.cyan(p.bold(columns[i])), ...keys.map(key => it[key])])
    })
    // eslint-disable-next-line no-console
    console.log(logger.toString())
  }
  else if (isArray(data)) {
    logger.setRowHeaders(['(index)', 'Value'].map(p.bold).map(p.cyan))

    data.forEach((it, i) => {
      logger.addRow([p.cyan(p.bold(i)), it])
    })
    // eslint-disable-next-line no-console
    console.log(logger.toString())
  }
  else if (isObject(data)) {
    logger.setRowHeaders(['(index)', 'Value'].map(p.bold).map(p.cyan))

    Object.entries(data).forEach(([key, value]) => {
      logger.addRow([p.cyan(p.bold(key)), value])
    })
    // eslint-disable-next-line no-console
    console.log(logger.toString())
  }
  else {
    // eslint-disable-next-line no-console
    console.log(data)
  }
}
