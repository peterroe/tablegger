# Config

When initializing the object, you can pass in some basic configurations

::: details
```ts
interface OptionType {
  /**
     * Is need a border
     * @default noBorder
     */
  theme?: themeType
  /**
     * @default center
     */
  align?: 'left' | 'right' | 'center'
  /**
     * The left margins of the cell
     * @default 0 (character)
     */
  paddingLeft?: number
  /**
     * The right margins of the cell
     * @default 0 (character)
     */
  paddingRight?: number
  /**
     * The top and bottom margins of the cell
     * @default 0 (line)
     */
  paddingY?: number
  /**
     * Left and right spacing of vertical borders
     * @default 0
     */
  gap?: number
  /**
     * Table title
     */
  title?: {
    name: string
    position?: 'top' | 'inline' | 'bottom'
    indent?: number
  }
}
```
:::

First, We have some data：

```ts
const data = [
  ['Stage', 'Time', 'Rss', 'HeapTotal', 'HeapUsed'],
  ['Init', '0ms', '38 MiB', '6.08 MiB', '5.12 MiB'],
  ['Import', '4.7ms', '+9.63 MiB', '+4.77 MiB', '+4.77 MiB'],
  ['Called', '7.24ms', '+0 Byte', '+0 Byte', '+792 Bytes']
]
```

Use the default theme as our display example

```ts
import { Tablegger } from 'tablegger'
const logger = new Tablegger()
  .setRowHeaders(data[0])
  .addRow(['Init', '0ms', '38 MiB', '6.08 MiB', '5.12 MiB'])
  .addRow(['Import', '4.7ms', '+9.63 MiB', '+4.77 MiB', '+4.77 MiB'])
  .addRow(['Called', '7.24ms', '+0 Byte', '+0 Byte', '+792 Bytes'])
```

<ClientOnly>
<img v-viewer img-light src="/images/singleLine.png" />
<img v-viewer img-dark invert src="/images/singleLine.png" />
</ClientOnly>

## paddingLeft

```ts
logger.setConfig({
  paddingLeft: 4 // 4 character gap
})
console.log(logger.toString())
```

<ClientOnly>
<img v-viewer img-light src="/images/config-paddingleft.png" />
<img v-viewer img-dark invert src="/images/config-paddingleft.png" />
</ClientOnly>

## paddingRight

```ts
logger.setConfig({
  paddingRight: 4 // 4 character gap
})
console.log(logger.toString())
```

<ClientOnly>
<img v-viewer img-light src="/images/config-paddingright.png" />
<img v-viewer img-dark invert src="/images/config-paddingright.png" />
</ClientOnly>

## gap

```ts
logger.setConfig({
  paddingLeft: 0,
  paddingRight: 0,
  gap: 2, // 2 character gap
})
console.log(logger.toString())
```

<ClientOnly>
<img v-viewer img-light src="/images/config-gap.png" />
<img v-viewer img-dark invert src="/images/config-gap.png" />
</ClientOnly>

## align

```ts
logger.setConfig({
  align: 'center' // 'left' | 'center' | 'right'
})
console.log(logger.toString())
```

<ClientOnly>
<img v-viewer img-light src="/images/config-align-center.png" />
<img v-viewer img-dark invert src="/images/config-align-center.png" />
</ClientOnly>

## title

```ts
logger.setConfig({
  theme: 'table',
  gap: 0,
  paddingLeft: 2,
  paddingRight: 2,
  title: {
    name: 'Hello World',
    position: 'inline', // 'top' | 'inline' | 'bottom'
    indent: 1
  }
})
console.log(logger.toString())
```

<ClientOnly>
<img v-viewer img-light src="/images/config-title.png" />
<img v-viewer img-dark invert src="/images/config-title.png" />
</ClientOnly>

## paddingY

```ts
logger.setConfig({
  paddingY: 1, // spacing between top and bottom of cell
})
console.log(logger.toString())
```

<ClientOnly>
<img v-viewer img-light src="/images/config-paddingy.png" />
<img v-viewer img-dark invert src="/images/config-paddingy.png" />
</ClientOnly>