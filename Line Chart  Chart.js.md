A line chart is a way of plotting data points on a line. Often, it is used to show trend data, or the comparison of two data sets.

```
<span>const</span> config <span>=</span> <span>{</span>
  <span>type</span><span>:</span> <span>'line'</span><span>,</span>
  <span>data</span><span>:</span> data<span>,</span>
<span>}</span><span>;</span><br>
```

## [#](https://www.chartjs.org/docs/latest/charts/line.html#dataset-properties) Dataset Properties

Namespaces:

-   `data.datasets[index]` - options for this dataset only
-   `options.datasets.line` - options for all line datasets
-   `options.elements.line` - options for all [line elements](https://www.chartjs.org/docs/latest/configuration/elements.html#line-configuration)
-   `options.elements.point` - options for all [point elements](https://www.chartjs.org/docs/latest/configuration/elements.html#point-configuration)
-   `options` - options for the whole chart

The line chart allows a number of properties to be specified for each dataset. These are used to set display properties for a specific dataset. For example, the colour of a line is generally set this way.

| Name | Type | [Scriptable](https://www.chartjs.org/docs/latest/general/options.html#scriptable-options) | [Indexable](https://www.chartjs.org/docs/latest/general/options.html#indexable-options) | Default |
| --- | --- | --- | --- | --- |
| [`backgroundColor`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | [`Color`](https://www.chartjs.org/docs/latest/general/colors.html) | Yes | \- | `'rgba(0, 0, 0, 0.1)'` |
| [`borderCapStyle`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `string` | Yes | \- | `'butt'` |
| [`borderColor`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | [`Color`](https://www.chartjs.org/docs/latest/general/colors.html) | Yes | \- | `'rgba(0, 0, 0, 0.1)'` |
| [`borderDash`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `number[]` | Yes | \- | `[]` |
| [`borderDashOffset`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `number` | Yes | \- | `0.0` |
| [`borderJoinStyle`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `'round'`|`'bevel'`|`'miter'` | Yes | \- | `'miter'` |
| [`borderWidth`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `number` | Yes | \- | `3` |
| [`clip`](https://www.chartjs.org/docs/latest/charts/line.html#general) | `number`|`object`|`false` | \- | \- | `undefined` |
| [`cubicInterpolationMode`](https://www.chartjs.org/docs/latest/charts/line.html#cubicinterpolationmode) | `string` | Yes | \- | `'default'` |
| [`data`](https://www.chartjs.org/docs/latest/charts/line.html#data-structure) | `object`|`object[]`| `number[]`|`string[]` | \- | \- | **required** |
| [`drawActiveElementsOnTop`](https://www.chartjs.org/docs/latest/charts/line.html#general) | `boolean` | Yes | Yes | `true` |
| [`fill`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `boolean`|`string` | Yes | \- | `false` |
| [`hoverBackgroundColor`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | [`Color`](https://www.chartjs.org/docs/latest/general/colors.html) | Yes | \- | `undefined` |
| [`hoverBorderCapStyle`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `string` | Yes | \- | `undefined` |
| [`hoverBorderColor`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | [`Color`](https://www.chartjs.org/docs/latest/general/colors.html) | Yes | \- | `undefined` |
| [`hoverBorderDash`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `number[]` | Yes | \- | `undefined` |
| [`hoverBorderDashOffset`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `number` | Yes | \- | `undefined` |
| [`hoverBorderJoinStyle`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `'round'`|`'bevel'`|`'miter'` | Yes | \- | `undefined` |
| [`hoverBorderWidth`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `number` | Yes | \- | `undefined` |
| [`indexAxis`](https://www.chartjs.org/docs/latest/charts/line.html#general) | `string` | \- | \- | `'x'` |
| [`label`](https://www.chartjs.org/docs/latest/charts/line.html#general) | `string` | \- | \- | `''` |
| [`order`](https://www.chartjs.org/docs/latest/charts/line.html#general) | `number` | \- | \- | `0` |
| [`pointBackgroundColor`](https://www.chartjs.org/docs/latest/charts/line.html#point-styling) | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| [`pointBorderColor`](https://www.chartjs.org/docs/latest/charts/line.html#point-styling) | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| [`pointBorderWidth`](https://www.chartjs.org/docs/latest/charts/line.html#point-styling) | `number` | Yes | Yes | `1` |
| [`pointHitRadius`](https://www.chartjs.org/docs/latest/charts/line.html#point-styling) | `number` | Yes | Yes | `1` |
| [`pointHoverBackgroundColor`](https://www.chartjs.org/docs/latest/charts/line.html#interactions) | `Color` | Yes | Yes | `undefined` |
| [`pointHoverBorderColor`](https://www.chartjs.org/docs/latest/charts/line.html#interactions) | `Color` | Yes | Yes | `undefined` |
| [`pointHoverBorderWidth`](https://www.chartjs.org/docs/latest/charts/line.html#interactions) | `number` | Yes | Yes | `1` |
| [`pointHoverRadius`](https://www.chartjs.org/docs/latest/charts/line.html#interactions) | `number` | Yes | Yes | `4` |
| [`pointRadius`](https://www.chartjs.org/docs/latest/charts/line.html#point-styling) | `number` | Yes | Yes | `3` |
| [`pointRotation`](https://www.chartjs.org/docs/latest/charts/line.html#point-styling) | `number` | Yes | Yes | `0` |
| [`pointStyle`](https://www.chartjs.org/docs/latest/charts/line.html#point-styling) | [`pointStyle`](https://www.chartjs.org/docs/latest/configuration/elements.html#types) | Yes | Yes | `'circle'` |
| [`segment`](https://www.chartjs.org/docs/latest/charts/line.html#segment) | `object` | \- | \- | `undefined` |
| [`showLine`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `boolean` | \- | \- | `true` |
| [`spanGaps`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `boolean`|`number` | \- | \- | `undefined` |
| [`stack`](https://www.chartjs.org/docs/latest/charts/line.html#general) | `string` | \- | \- | `'line'` |
| [`stepped`](https://www.chartjs.org/docs/latest/charts/line.html#stepped) | `boolean`|`string` | \- | \- | `false` |
| [`tension`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) | `number` | \- | \- | `0` |
| [`xAxisID`](https://www.chartjs.org/docs/latest/charts/line.html#general) | `string` | \- | \- | first x axis |
| [`yAxisID`](https://www.chartjs.org/docs/latest/charts/line.html#general) | `string` | \- | \- | first y axis |

All these values, if `undefined`, fallback to the scopes described in [option resolution](https://www.chartjs.org/docs/latest/general/options)

### [#](https://www.chartjs.org/docs/latest/charts/line.html#general) General

| Name | Description |
| --- | --- |
| `clip` | How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. `0` = clip at chartArea. Clipping can also be configured per side: `clip: {left: 5, top: false, right: -2, bottom: 0}` |
| `drawActiveElementsOnTop` | Draw the active points of a dataset over the other points of the dataset |
| `indexAxis` | The base axis of the dataset. `'x'` for horizontal lines and `'y'` for vertical lines. |
| `label` | The label for the dataset which appears in the legend and tooltips. |
| `order` | The drawing order of dataset. Also affects order for stacking, tooltip and legend. [more](https://www.chartjs.org/docs/latest/charts/mixed.html#drawing-order) |
| `stack` | The ID of the group to which this dataset belongs to (when stacked, each group will be a separate stack). [more](https://www.chartjs.org/docs/latest/charts/line.html#stacked-area-chart) |
| `xAxisID` | The ID of the x-axis to plot this dataset on. |
| `yAxisID` | The ID of the y-axis to plot this dataset on. |

### [#](https://www.chartjs.org/docs/latest/charts/line.html#point-styling) Point Styling

The style of each point can be controlled with the following properties:

| Name | Description |
| --- | --- |
| `pointBackgroundColor` | The fill color for points. |
| `pointBorderColor` | The border color for points. |
| `pointBorderWidth` | The width of the point border in pixels. |
| `pointHitRadius` | The pixel size of the non-displayed point that reacts to mouse events. |
| `pointRadius` | The radius of the point shape. If set to 0, the point is not rendered. |
| `pointRotation` | The rotation of the point in degrees. |
| `pointStyle` | Style of the point. [more...](https://www.chartjs.org/docs/latest/configuration/elements.html#point-styles) |

All these values, if `undefined`, fallback first to the dataset options then to the associated [`elements.point.*`](https://www.chartjs.org/docs/latest/configuration/elements.html#point-configuration) options.

### [#](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) Line Styling

The style of the line can be controlled with the following properties:

| Name | Description |
| --- | --- |
| `backgroundColor` | The line fill color. |
| `borderCapStyle` | Cap style of the line. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap) . |
| `borderColor` | The line color. |
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash) . |
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset) . |
| `borderJoinStyle` | Line joint style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin) . |
| `borderWidth` | The line width (in pixels). |
| `fill` | How to fill the area under the line. See [area charts](https://www.chartjs.org/docs/latest/charts/area.html). |
| `tension` | Bezier curve tension of the line. Set to 0 to draw straightlines. This option is ignored if monotone cubic interpolation is used. |
| `showLine` | If false, the line is not drawn for this dataset. |
| `spanGaps` | If true, lines will be drawn between points with no or null data. If false, points with `null` data will create a break in the line. Can also be a number specifying the maximum gap length to span. The unit of the value depends on the scale used. |

If the value is `undefined`, the values fallback to the associated [`elements.line.*`](https://www.chartjs.org/docs/latest/configuration/elements.html#line-configuration) options.

### [#](https://www.chartjs.org/docs/latest/charts/line.html#interactions) Interactions

The interaction with each point can be controlled with the following properties:

| Name | Description |
| --- | --- |
| `pointHoverBackgroundColor` | Point background color when hovered. |
| `pointHoverBorderColor` | Point border color when hovered. |
| `pointHoverBorderWidth` | Border width of point when hovered. |
| `pointHoverRadius` | The radius of the point when hovered. |

### [#](https://www.chartjs.org/docs/latest/charts/line.html#cubicinterpolationmode) cubicInterpolationMode

The following interpolation modes are supported.

-   `'default'`
-   `'monotone'`

The `'default'` algorithm uses a custom weighted cubic interpolation, which produces pleasant curves for all types of datasets.

The `'monotone'` algorithm is more suited to `y = f(x)` datasets: it preserves monotonicity (or piecewise monotonicity) of the dataset being interpolated, and ensures local extremums (if any) stay at input data points.

If left untouched (`undefined`), the global `options.elements.line.cubicInterpolationMode` property is used.

### [#](https://www.chartjs.org/docs/latest/charts/line.html#segment) Segment

Line segment styles can be overridden by scriptable options in the `segment` object. Currently, all of the `border*` and `backgroundColor` options are supported. The segment styles are resolved for each section of the line between each point. `undefined` fallbacks to main line styles.

TIP

To be able to style gaps, you need the [`spanGaps`](https://www.chartjs.org/docs/latest/charts/line.html#line-styling) option enabled.

Context for the scriptable segment contains the following properties:

-   `type`: `'segment'`
-   `p0`: first point element
-   `p1`: second point element
-   `p0DataIndex`: index of first point in the data array
-   `p1DataIndex`: index of second point in the data array
-   `datasetIndex`: dataset index

[Example usage](https://www.chartjs.org/docs/latest/samples/line/segments.html)

### [#](https://www.chartjs.org/docs/latest/charts/line.html#stepped) Stepped

The following values are supported for `stepped`.

-   `false`: No Step Interpolation (default)
-   `true`: Step-before Interpolation (eq. `'before'`)
-   `'before'`: Step-before Interpolation
-   `'after'`: Step-after Interpolation
-   `'middle'`: Step-middle Interpolation

If the `stepped` value is set to anything other than false, `tension` will be ignored.

## [#](https://www.chartjs.org/docs/latest/charts/line.html#default-options) Default Options

It is common to want to apply a configuration setting to all created line charts. The global line chart settings are stored in `Chart.overrides.line`. Changing the global options only affects charts created after the change. Existing charts are not changed.

For example, to configure all line charts with `spanGaps = true` you would do:

## [#](https://www.chartjs.org/docs/latest/charts/line.html#data-structure) Data Structure

All the supported [data structures](https://www.chartjs.org/docs/latest/general/data-structures.html) can be used with line charts.

## [#](https://www.chartjs.org/docs/latest/charts/line.html#stacked-area-chart) Stacked Area Chart

Line charts can be configured into stacked area charts by changing the settings on the y-axis to enable stacking. Stacked area charts can be used to show how one data trend is made up of a number of smaller pieces.

## [#](https://www.chartjs.org/docs/latest/charts/line.html#vertical-line-chart) Vertical Line Chart

A vertical line chart is a variation on the horizontal line chart. To achieve this, you will have to set the `indexAxis` property in the options object to `'y'`. The default for this property is `'x'` and thus will show horizontal lines.

```
<span>const</span> config <span>=</span> <span>{</span>
  <span>type</span><span>:</span> <span>'line'</span><span>,</span>
  <span>data</span><span>:</span> data<span>,</span>
  <span>options</span><span>:</span> <span>{</span>
    <span>indexAxis</span><span>:</span> <span>'y'</span><span>,</span>
    <span>scales</span><span>:</span> <span>{</span>
      <span>x</span><span>:</span> <span>{</span>
        <span>beginAtZero</span><span>:</span> <span>true</span>
      <span>}</span>
    <span>}</span>
  <span>}</span>
<span>}</span><span>;</span><br>
```

### [#](https://www.chartjs.org/docs/latest/charts/line.html#config-options) Config Options

The configuration options for the vertical line chart are the same as for the [line chart](https://www.chartjs.org/docs/latest/charts/line.html#configuration-options). However, any options specified on the x-axis in a line chart, are applied to the y-axis in a vertical line chart.

## [#](https://www.chartjs.org/docs/latest/charts/line.html#internal-data-format) Internal data format

`{x, y}`

Last Updated: 12/1/2024, 4:35:13 PM