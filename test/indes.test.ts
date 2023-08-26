import { describe, expect, it } from 'vitest'
import p from 'picocolors'
import { Tablegger } from '../src/index'
describe('test', () => {
  it('should workd right', () => {
    const tablegger = new Tablegger({
      cell: {
        gapX: 4,
        align: 'right',
        paddingX: 2,
        paddingY: 1,
      },
    }).setColumn(3)
    tablegger.add(p.bgYellow('nam2sdfsdfs34e'))
    tablegger.add('ag234e')
    tablegger.add(p.red('hobby'))
    tablegger.add('take')
    tablegger.add('why')
    tablegger.add('wh23y')
    tablegger.add('why')
    expect(tablegger.toString()).toMatchInlineSnapshot(`
      "
        [43mnam2sdfsdfs34e[49m        ag234e        [31mhobby[39m  


                  take           why        wh23y  


                   why                             

      "
    `)
  })

  it('should workd left', () => {
    const tablegger = new Tablegger({
      cell: {
        gapX: 4,
      },
    }).setColumn(2)
    tablegger.add('name')
    tablegger.add('age')
    tablegger.add(p.blue('hobby'))
    tablegger.add('take')
    tablegger.add('why')
    tablegger.add(p.underline('234300h4'))
    tablegger.add(p.bold('gf238884d'))
    tablegger.add('why')
    tablegger.add('why')
    tablegger.add('why')
    tablegger.add('why')
    expect(tablegger.toString()).toMatchInlineSnapshot(`
      "name         age    [34mhobby[39m   
      take         why    [4m234300h4[24m
      [1mgf238884d[22m    why    why     
      why          why            
      "
    `)
  })

  it('should workd center', () => {
    const tablegger = new Tablegger({
      table: {
        border: true,
      },
      cell: {
        gapX: 0,
        paddingX: 2,
        paddingY: 2,
        align: 'center',
      },
    })
    tablegger.add('name')
    tablegger.add('agssss3sse')
    tablegger.add(p.blue('hohhhbby'))
    tablegger.add(p.bold('take'))
    tablegger.add('why')
    tablegger.add(p.red('jjhh'))
    expect(tablegger.toString()).toMatchInlineSnapshot(`
      "┌────────┬──────────────┬────────────┐
      │        │              │            │
      │        │              │            │
      │  name  │  agssss3sse  │  [34mhohhhbby[39m  │
      │        │              │            │
      │        │              │            │
      ├────────┼──────────────┼────────────┤
      │        │              │            │
      │        │              │            │
      │  [1mtake[22m  │     why      │    [31mjjhh[39m    │
      │        │              │            │
      │        │              │            │
      └────────┴──────────────┴────────────┘
      "
    `)
    tablegger.set(1, 1, p.red('anything'))
    expect(tablegger.toString()).toMatchInlineSnapshot(`
      "┌────────┬──────────────┬────────────┐
      │        │              │            │
      │        │              │            │
      │  name  │  agssss3sse  │  [34mhohhhbby[39m  │
      │        │              │            │
      │        │              │            │
      ├────────┼──────────────┼────────────┤
      │        │              │            │
      │        │              │            │
      │  [1mtake[22m  │   [31manything[39m   │    [31mjjhh[39m    │
      │        │              │            │
      │        │              │            │
      └────────┴──────────────┴────────────┘
      "
    `)
  })
})
