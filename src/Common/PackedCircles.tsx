import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import React, { useEffect } from "react";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export interface PackedCirclesData {
    name: string;
    value: number;
    color: string;
}

interface PackedCirclesProps {
    name: string;
    data: PackedCirclesData[];
    indicative?: boolean;
}

export function PackedCircles({ name, data, indicative }: PackedCirclesProps) {

    const chartDiv = `${name}-packed-circles`;


    useEffect(() => {

        let chart = am4core.create(chartDiv, am4plugins_forceDirected.ForceDirectedTree);

        let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        networkSeries.data = data;

        networkSeries.dataFields.linkWith = "linkWith";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.id = "name";
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.children = "children";
        networkSeries.dataFields.color = "color";
        networkSeries.links.template.distance = 10;
        networkSeries.nodes.template.tooltipText = indicative ? "{name}" : "{name}: {value}";
        networkSeries.nodes.template.fillOpacity = 1;
        networkSeries.nodes.template.outerCircle.scale = 1;

        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.nodes.template.label.fill = am4core.color("#ffffff");
        networkSeries.fontSize = 12;
        networkSeries.nodes.template.label.hideOversized = false;
        networkSeries.nodes.template.label.truncate = false;
        networkSeries.minRadius = am4core.percent(3);
        if(indicative) networkSeries.maxRadius = am4core.percent(3);
        networkSeries.manyBodyStrength = -6;
        networkSeries.links.template.strokeOpacity = 0;

        return () => {
            chart.dispose();
        };

    }, [chartDiv, data]);

    return (
        <>
            <div id={chartDiv} style={{ width: "100%", height: 400 }}></div>
        </>
    );
}