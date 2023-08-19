import { describe, expect, it } from 'vitest'
import p from 'picocolors'
import { NTLog } from '../src/index'
describe('test', () => {
  it('should workd right', () => {
    const ntLog = new NTLog({
      table: {
        column: 3,
      },
      cell: {
        gapX: 4,
        align: 'right',
      },
    })
    ntLog.push(p.bgYellow('nam2sdfsdfs34e'))
    ntLog.push('ag234e')
    ntLog.push(p.red('hobby'))
    ntLog.push('take')
    ntLog.push('why')
    ntLog.push('wh23y')
    ntLog.push('why')
    expect(ntLog.toString()).toMatchInlineSnapshot(`
      "[43mnam2sdfsdfs34e[49m||||ag234e||||[31mhobby[39m||||
                take||||   why||||wh23y||||
                 why||||      ||||     ||||
      "
    `)
  })

  it('should workd left', () => {
    const ntLog = new NTLog({
      table: {
        column: 2,
      },
      cell: {
        gapX: 4,
      },
    })
    ntLog.push('name')
    ntLog.push('age')
    ntLog.push(p.blue('hobby'))
    ntLog.push('take')
    ntLog.push('why')
    ntLog.push(p.underline('234300h4'))
    ntLog.push(p.bold('gf238884d'))
    ntLog.push('why')
    ntLog.push('why')
    ntLog.push('why')
    ntLog.push('why')
    expect(ntLog.toString()).toMatchInlineSnapshot(`
      "name     ||||age     ||||
      [34mhobby[39m    ||||take    ||||
      why      ||||[4m234300h4[24m||||
      [1mgf238884d[22m||||why     ||||
      why      ||||why     ||||
      why      ||||        ||||
      "
    `)
  })

  it('should workd center', () => {
    const ntLog = new NTLog({
      table: {
        column: 2,
      },
      cell: {
        gapX: 4,
        align: 'center',
      },
    })
    ntLog.push('name')
    ntLog.push('agssss3sse')
    ntLog.push(p.blue('hohhhbby'))
    ntLog.push(p.bold('take'))
    ntLog.push('why')
    ntLog.push(p.red('jjhh'))
    expect(ntLog.toString()).toMatchInlineSnapshot(`
      "  name  ||||agssss3sse||||
      [34mhohhhbby[39m||||   [1mtake[22m   ||||
        why   ||||   [31mjjhh[39m   ||||
      "
    `)
  })
})
