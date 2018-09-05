### Statistics  
This component displays charts and will be used for the following `Container Types`: `AQ_Statistic_Visualization`, `AQ_Statistic_Aggregate` and `AQ_Statistic_Process`
The default chart that will be displayed when no presentation style is chosen will be doughnut
By default the chart will no be animated, set the presentation if this is desired

### Provider
This component used the `Statistics` provider. 
This provider contains a observable which results in a list of `Statistic` object.
The `Statistic` object contains the label name and the data for this label.

### Presentation Styles
If you add the presentation style `StatisticPie` to display a pie chart
If you add the presentation style `StatisticBar` to display a bar chart
If you add the presentation style `StatisticDoughnut` to display a doughnut chart
If you add the presentation style `StatisticRadar` to display a radar chart
If you add the presentation style `StatisticLine` to display a line chart
If you add the presentation style `StatisticPolar` to display a polar area chart

If you add the presentation style `Animation` in combination with on of the charts, the chart will be animated

### Presentation Styles (deprecated)
The following presentation styles are deprecated:
`pie`, `bar`, `doughnut`, `radar`, `line`, `polar`
