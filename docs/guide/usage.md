# Basic Usage

Instantiate an object via `Tablegger`, then Call `setRowHeaders` and add the corresponding row lines via `addRow` method：

```ts
import { Tablegger } from 'tablegger'

const logger = new Tablegger()
  .setRowHeaders(['Stage', 'Time', 'Rss', 'HeapTotal', 'HeapUsed'])

logger.addRow(['Init', '0ms', '38 MiB', '6.08 MiB', '5.12 MiB'])
logger.addRow(['Import', '4.7ms', '+9.63 MiB', '+4.77 MiB', '+4.77 MiB'])
logger.addRow(['Called', '7.24ms', '+0 Byte', '+0 Byte', '+792 Bytes'])

console.log(logger.toString())
```

You will get the following output in terminal:

<ClientOnly>
<img v-viewer img-light src="/images/singleLine.png" />
<img v-viewer img-dark invert src="/images/singleLine.png" />
</ClientOnly>

It's a good start, let's go further
