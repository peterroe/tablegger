# Variety of themes

```ts
themeType = 'singleLine' | 'table' | 'noBorder' | 'doubleLine' | 'horizontalLine' | 'intersect'
```

```ts
import { Tablegger } from 'tablegger'

const logger = new Tablegger({
  theme: 'table',
}).setRowHeaders(['Stage', 'Time', 'Rss', 'HeapTotal', 'HeapUsed'])

logger.addRow(['Init', '0ms', '38 MiB', '6.08 MiB', '5.12 MiB'])
logger.addRow(['Import', '4.7ms', '+9.63 MiB', '+4.77 MiB', '+4.77 MiB'])
logger.addRow(['Called', '7.24ms', '+0 Byte', '+0 Byte', '+792 Bytes'])

console.log('table theme:')
console.log(logger.toString())

// Change Config anywhere, anyTime
logger.setConfig({
  theme: 'horizontalLine',
})
console.log('horizontalLine theme:')
console.log(logger.toString())

logger.setConfig({
  theme: 'doubleLine',
})
console.log('doubleLine theme:')
console.log(logger.toString())
```

<ClientOnly>
<img v-viewer img-light src="/images/themes.png" />
<img v-viewer img-dark invert src="/images/themes.png" />
</ClientOnly>

## noBorder

```ts
import { Tablegger } from 'tablegger'
const logger = new Tablegger({
  theme: 'noBorder',
})

logger.addRow(['-s', '--stderr', 'output message to standard error as well'])
logger.addRow(['-S', '--size', 'maximum size for a single message'])
logger.addRow(['-t', '--tag <tag>', 'mark every line with this tag'])
logger.addRow(['-n', '--port <port>', 'use this port for UDP or TCP connection'])

console.log(logger.toString())
```

<ClientOnly>
<img v-viewer img-light src="/images/theme-noborder.png" />
<img v-viewer img-dark invert src="/images/theme-noborder.png" />
</ClientOnly>