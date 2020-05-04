import React, { useEffect } from "react";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// charts theme
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export interface HeatMapData {
    country: string;
    date: string;
    value: number;
}

interface HeatMapProps {
    name: string;
    data: HeatMapData[];
}

export function HeatMap({ name, data }: HeatMapProps) {
    const chartDiv = name + "-chart";

    useEffect(() => {

        let chart = am4core.create(chartDiv, am4charts.XYChart);
        chart.maskBullets = false;

        let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

        xAxis.dataFields.category = "date";
        yAxis.dataFields.category = "country";

        xAxis.renderer.grid.template.disabled = true;
        // xAxis.renderer.minGridDistance = 40;

        yAxis.renderer.grid.template.disabled = true;
        yAxis.renderer.inversed = true;
        // yAxis.renderer.minGridDistance = 30;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "date";
        series.dataFields.categoryY = "country";
        series.dataFields.value = "value";
        series.sequencedInterpolation = true;
        series.defaultState.transitionDuration = 3000;

        let bgColor = new am4core.InterfaceColorSet().getFor("background");

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 1;
        columnTemplate.strokeOpacity = 0.2;
        columnTemplate.stroke = bgColor;
        columnTemplate.tooltipText = "{date}, {country}: {value.workingValue.formatNumber('#.')}";
        columnTemplate.width = am4core.percent(100);
        columnTemplate.height = am4core.percent(100);

        series.heatRules.push({
        target: columnTemplate,
        property: "fill",
        min: am4core.color(bgColor),
        max: chart.colors.getIndex(0)
        });

        // heat legend
        let heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);
        heatLegend.width = am4core.percent(100);
        heatLegend.series = series;
        heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
        heatLegend.valueAxis.renderer.minGridDistance = 30;

        // heat legend behavior
        series.columns.template.events.on("over", function(event) {
        handleHover(event.target);
        })

        series.columns.template.events.on("hit", function(event) {
        handleHover(event.target);
        })

        function handleHover(column: any) {
        if (!isNaN(column.dataItem.value)) {
            heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
        }
        else {
            heatLegend.valueAxis.hideTooltip();
        }
        }

        series.columns.template.events.on("out", function(event) {
        heatLegend.valueAxis.hideTooltip();
        })

        chart.data = data;
        
        return () => {
            chart.dispose();
        }
    }, [chartDiv, data]);

    return (
        <>
            <div id={chartDiv} style={{ width: "100%", height: 700 }}></div>
        </>
    );
}