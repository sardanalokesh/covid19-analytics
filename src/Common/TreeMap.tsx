import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { useTheme } from "@material-ui/core";
import React, { useEffect } from "react";

// charts theme
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export interface TreeMapData {
    name: string;
    value: number;
}

interface TreeMapProps {
    name: string;
    data: TreeMapData[];
}

export function TreeMap({name, data}: TreeMapProps) {

    const theme = useTheme();

    const chartDiv = name + "-chart";

    useEffect(() => {
        let chart = am4core.create(chartDiv, am4charts.TreeMap);
        chart.hiddenState.properties.opacity = 0;

        chart.data = [{
        name: "Impressions",
        children: data
        }];

        chart.colors.step = 2;

        // define data fields
        chart.dataFields.value = "value";
        chart.dataFields.name = "name";
        chart.dataFields.children = "children";
        chart.layoutAlgorithm = chart.binaryTree;

        chart.zoomable = false;

        // level 0 series template
        let level0SeriesTemplate = chart.seriesTemplates.create("0");
        let level0ColumnTemplate = level0SeriesTemplate.columns.template;

        level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
        level0ColumnTemplate.fillOpacity = 0;
        level0ColumnTemplate.strokeWidth = 4;
        level0ColumnTemplate.strokeOpacity = 0;

        // level 1 series template
        let level1SeriesTemplate = chart.seriesTemplates.create("1");
        if (level1SeriesTemplate.tooltip) {
            level1SeriesTemplate.tooltip.dy = - 15;
            level1SeriesTemplate.tooltip.pointerOrientation = "vertical";
            level1SeriesTemplate.tooltip.animationDuration = 0;
            level1SeriesTemplate.adapter.add("tooltipText", (value, tooltip) => {
                console.log(tooltip, value);
                return value;
            });
        }
        level1SeriesTemplate.strokeOpacity = 1;

        let level1ColumnTemplate = level1SeriesTemplate.columns.template;

        level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10)
        level1ColumnTemplate.fillOpacity = 1;
        level1ColumnTemplate.strokeWidth = 4;
        level1ColumnTemplate.stroke = am4core.color(theme.palette.secondary.main);

        let bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
        bullet1.locationY = 0.5;
        bullet1.locationX = 0.5;
        bullet1.label.text = "{name}";
        bullet1.label.fill = am4core.color("#ffffff");
        bullet1.interactionsEnabled = false;
        chart.maxLevels = 2;

        return () => {
            chart.dispose();
        };
    }, [data, theme, chartDiv]);
    
    return (
        <>
            <div id={chartDiv} style={{ width: "100%", height: 500 }}></div>
        </>
    );
}