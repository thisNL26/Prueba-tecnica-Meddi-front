export { default as ChartCrosshair } from "./ChartCrosshair.vue"
export { default as ChartLegend } from "./ChartLegend.vue"
export { default as ChartSingleTooltip } from "./ChartSingleTooltip.vue"
export { default as ChartTooltip } from "./ChartTooltip.vue"

export function defaultColors(count: number = 3) {
  return Array.from(new Array(count).keys()).map(i => `var(--chart-${i + 1})`)
}

export * from "./interface"
