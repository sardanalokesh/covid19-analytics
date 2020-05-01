import React, { useEffect, useRef } from "react";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// charts theme
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export interface DonutData {
    name: string;
    count: number;
    color: string;
}

interface DonutProps {
    name: string;
    data: DonutData[];
}

export function Donut({ name, data }: DonutProps) {

    const chartDiv = name + "-chart";
    const chartRef = useRef<am4charts.PieChart | null>(null);
    const numberformatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });

    useEffect(() => {
        // Create chart instance
        let chart = am4core.create(chartDiv, am4charts.PieChart);

        // Add data
        chart.data = data;

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "count";
        pieSeries.dataFields.category = "name";
        pieSeries.innerRadius = am4core.percent(50);
        pieSeries.ticks.template.disabled = true;
        // pieSeries.labels.template.radius = am4core.percent(-10);
        pieSeries.alignLabels = false;
        // pieSeries.labels.template.disabled = true;

        pieSeries.slices.template.propertyFields.fill = "color";
        let rgm = new am4core.RadialGradientModifier();
        rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
        pieSeries.slices.template.fillModifier = rgm;
        pieSeries.slices.template.strokeModifier = rgm;
        pieSeries.slices.template.strokeOpacity = 0.4;
        pieSeries.slices.template.strokeWidth = 0;

        /* chart.legend = new am4charts.Legend();
        chart.legend.position = "right"; */

        let label = chart.seriesContainer.createChild(am4core.Label);
        label.textAlign = "middle";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.adapter.add("text", function(text, target){
            return "[font-size:14px]Confirmed Cases[/]\n[bold font-size:25px]" + numberformatter.format(pieSeries.dataItem.values.value.sum) + "[/]";
        })


        chartRef.current = chart;

        return () => {
            chart.dispose();
        }

    }, [chartDiv, data, numberformatter]);

    return (
        <>
            <div id={chartDiv} style={{ width: "100%", height: 400 }}></div>
        </>
    );
}