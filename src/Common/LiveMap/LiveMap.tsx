import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import geoData from "@amcharts/amcharts4-geodata/usaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

// charts theme
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export interface LiveMapData {
    name: string;
    latitude: number;
    longitude: number;
    value: number;
    geoId: number;
}

interface LiveMapProps {
    data: LiveMapData[]
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

export function LiveMap({ data }: LiveMapProps) {
    const classes = useStyles();
    const chartDiv = "liveMap";
    const imageSeriesRef = useRef<am4maps.MapImageSeries | null>(null);

    useEffect(() => {
        // Create map instance
        let chart = am4core.create(chartDiv, am4maps.MapChart);

        // Set map definition
        chart.geodata = geoData;
        //chart.geodataSource.url = '/us-metros.geojson';

        chart.projection = new am4maps.projections.AlbersUsa();

        // zoom control
        chart.zoomControl = new am4maps.ZoomControl();
        chart.chartContainer.wheelable = false;

        // preloader
        if (chart.preloader) chart.preloader.disabled = true;
        /* let indicator: am4core.Container;
        const showIndicator = () => {
            indicator = chart.tooltipContainer?.createChild(am4core.Container) as am4core.Container;
            if (indicator) {
                indicator.background.fill = am4core.color("#fff");
                indicator.background.fillOpacity = 0.8;
                indicator.width = am4core.percent(100);
                indicator.height = am4core.percent(100);
                
                var indicatorLabel = indicator.createChild(am4core.Label);
                indicatorLabel.text = "Loading...";
                indicatorLabel.align = "center";
                indicatorLabel.valign = "middle";
                indicatorLabel.fontSize = 20;
            }
        }
        const hideIndicator = () => {
            if(indicator) indicator.dispose();
        };

        //enable indicator
        showIndicator(); */

        // Set projection
        // chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;

        // polygonSeries.exclude = ["US-AK", "US-GU", "US-PR", "US-HI", "US-VI", "US-MP", "US-AS"]; 

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template;
        /* polygonTemplate.tooltipText = "{name}"; */
        polygonTemplate.polygon.fillOpacity = 0.6;
        polygonTemplate.polygon.stroke = am4core.color('#fff');
        polygonTemplate.polygon.strokeOpacity = 0.2;


        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(0);

        // Add image series
        let imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.dataFields.value = "value";
        imageSeries.mapImages.template.tooltipText = '{name}\nImpressions: {value.formatNumber("#,###")}';
        imageSeries.mapImages.template.propertyFields.url = "url";


        let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle.radius = 5;
        circle.propertyFields.fill = "color";
        circle.adapter.add('radius', (value, circle) => {
            return value;
        });

        /* let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle2.radius = 5;
        circle2.propertyFields.fill = "color"; */

        imageSeries.heatRules.push({
            target: circle,
            property: "radius",
            min: 3,
            max: 10
        });

        imageSeries.heatRules.push({
            target: circle,
            property: "fill",
            min: am4core.color("#F4F46A"),
            max: am4core.color("#E91E63"),
        });


        /* circle2.events.on("inited", function(event){
            animateBullet(event.target);
        }) */

        // adding labels
        /* let label = imageSeries.mapImages.template.createChild(am4core.Label);
        label.text = "{value}";
        label.horizontalCenter = "middle";
        label.verticalCenter = "top";
        label.fontSize = 10;
        label.interactionsEnabled = false;
        label.nonScaling = true; */

        imageSeriesRef.current = imageSeries;

        return () => {
            chart.dispose();
        }
    }, []);

    useEffect(() => {
        // const color = am4core.color("#EA73DC");
        if (imageSeriesRef.current) {
            imageSeriesRef.current.data = data;// data.map(d => ({...d, color}));
        }
    }, [data]);

    return (
        <>
            <div id={chartDiv} className={classes.chartDiv}></div>
        </>
    );
}

/* function animateBullet(circle: am4core.Circle) {
    let animation = circle.animate([{ property: "scale", from: 1, to: 3 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
    animation.events.on("animationended", function(event){
      animateBullet(event.target.object as am4core.Circle);
    })
} */