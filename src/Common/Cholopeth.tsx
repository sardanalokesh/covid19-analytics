import geodata from "@amcharts/amcharts4-geodata/india2019Low";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

// charts theme
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export interface ChloropethData {
    id: string,
    value: number
}

interface Props {
    name: string;
    color: string;
    data: ChloropethData[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartDiv: {
            width: '100%',
            height: 400,
            [theme.breakpoints.down('md')]: {
                height: 250
            }
        }
    })
);

export function Chloropeth({ name, color, data }: Props) {
    const classes = useStyles();
    const chartDiv = `${name}-chloropeth-chart`;

    useEffect(() => {
        let chart = am4core.create(chartDiv, am4maps.MapChart);

        // Set map definition
        chart.geodata = geodata;

        // Set projection
        // chart.projection = new am4maps.projections.AlbersUsa();
        chart.projection = new am4maps.projections.Mercator();

        // zoom control
        chart.zoomControl = new am4maps.ZoomControl();
        chart.chartContainer.wheelable = false;

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        //Set min/max fill color for each area
        polygonSeries.heatRules.push({
            property: "fill",
            target: polygonSeries.mapPolygons.template,
            // min: am4core.color("#F5DBCB"),
            min: am4core.color(color).brighten(1),
            max: am4core.color(color).brighten(-0.3),
            dataField: "value"
        });

        // Make map load polygon data (state shapes and names) from GeoJSON
        polygonSeries.useGeodata = true;

        // Set heatmap values for each state
        polygonSeries.data = data;
        polygonSeries.dataFields.value = "value";

        // Configure series tooltip
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeWidth = 0.5;
        
        return () => {
            chart.dispose();
        }
    }, [chartDiv, data, color]);

    return (
        <div id={chartDiv} className={classes.chartDiv}></div>
    );
}