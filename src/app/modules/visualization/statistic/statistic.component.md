### Statistics  
This component displays charts and will be used for the following Container types: `AQ_Statistic_Visualization`, `AQ_Statistic_Aggregate` and `AQ_Statistic_Process`

### Provider
This component used the `Statistics` provider. 
This provider contains a observable which emits a list of `Statistic` objects.
The `Statistic` object contains the label name and the data for this label.

### Presentation Styles
Add the presentation style `StatisticPie` to display a pie chart  
Add the presentation style `StatisticBar` to display a bar chart  
Add the presentation style `StatisticDoughnut` to display a doughnut chart  
Add the presentation style `StatisticRadar` to display a radar chart  
Add the presentation style `StatisticLine` to display a line chart  
Add the presentation style `StatisticPolar` to display a polar area chart  

By default, if there is no presentation style added, a doughnut chart will be displayed

If you add the presentation style `Animation` in combination with any of the charts, the chart will be animated.

### Presentation Styles (deprecated)
The following presentation styles are deprecated, but still supported for backwards compatibility:  
`pie`, `bar`, `doughnut`, `radar`, `line`, `polar` and `animate`

### Chart look and feel
The look and feel of the charts can be adjusted by setting properties in `statistic.component.ts`. These options are 
available:
* `colors`
* `fontColor`
* `fontSize`
* `boxWidth`
* `padding`
