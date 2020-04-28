import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { useEffect, useRef } from "react";

// charts theme
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export interface ColumnChartData {
    time: Date;
    value: number;
}

interface ColumnChartProps {
    name: string;
    color: string;
    data: ColumnChartData[];
    baseInterval?: am4core.ITimeInterval;
}

export function ColumnChart({name, color, data, baseInterval}: ColumnChartProps) {

    const chartDiv = name + "-chart";
    const chartRef = useRef<am4charts.XYChart | null>(null);

    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
          const chart = am4core.create(chartDiv, am4charts.XYChart);
          chart.paddingRight = 20;
          if (baseInterval?.timeUnit !== "day") { 
            chart.dateFormatter.timezoneOffset = 420; //PDT
          }

          let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          dateAxis.dataFields.date = "time";
          dateAxis.baseInterval = baseInterval || {timeUnit: 'minute', count: 5};

          if (baseInterval?.timeUnit !== "day") { 
            dateAxis.renderer.labels.template.location = 0.0001;
          }
          
          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.numberFormatter.numberFormat = "#a";
          valueAxis.min = 0;

          chartRef.current = chart;
          
          // Create series
          let series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = "value";
          series.dataFields.dateX = "time";
          series.name = name;
          if (baseInterval?.timeUnit === "day") {
            series.columns.template.tooltipText = '{dateX.formatDate("MMM dd, yyyy")}\n[bold]{name}: {valueY.formatNumber("#,###")}[/]';
          } else {
            series.columns.template.tooltipText = '{dateX.formatDate("MMM dd, yyyy hh:mm a")} PDT\n[bold]{name}: {valueY.formatNumber("#,###")}[/]';
          }
          series.columns.template.fillOpacity = .8;
          if (color) {
            series.columns.template.stroke = am4core.color(color);
            series.columns.template.fill = am4core.color(color);    
          }
          
          let columnTemplate = series.columns.template;
          columnTemplate.strokeWidth = 2;
          columnTemplate.strokeOpacity = 1;

        return () => {
            chart.dispose();
        };

    }, [color, chartDiv, name, baseInterval] );

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data = data;
        }
    }, [data]);

    return (
        <>
            <div id={chartDiv} style={{ width: "100%", height: 230 }}></div>
        </>
    );
}