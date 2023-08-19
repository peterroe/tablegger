import p from 'picocolors'
import { NTLog } from '../src/index'
const ntLog = new NTLog({
  table: {
    column: 2,
  },
  cell: {
    gapX: 4,
    align: 'left',
    paddingX: 2,
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

console.log(
  ntLog.toString(),
)
