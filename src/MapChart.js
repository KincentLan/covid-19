import React, {useState, useEffect, memo} from "react";
import {ZoomableGroup, ComposableMap, Geographies, Geography} from "react-simple-maps";
import {scaleThreshold} from "d3-scale";
import {csv} from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const geoUrl_states = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({setTooltipContent}) => {
    const [data, setData] = useState([]);
    const [col, setCol] = useState([]);

    useEffect(() => {
        csv("https://usafactsstatic.blob.core.windows.net/public/data/" +
            "covid-19/covid_confirmed_usafacts.csv").then(counties => {
            setData(counties);
            setCol(counties.columns)
        });
    }, []);

    for (let i = 0; i < data.length; i++) {
        if (data[i]['countyFIPS'].length === 4) {
            data[i]['countyFIPS'] = "0" + data[i]['countyFIPS'];
        }
    }

    const colorScale = scaleThreshold()
        .domain([0, 5, 10, 50, 100, 500, 1000, 5000, Number.MAX_SAFE_INTEGER])
        .range([
            "#FFF2F2",
            "#FFE5E5",
            "#FFC6C6",
            "#FFAAAA",
            "#FF6868",
            "#FD4646",
            "#FF0F00",
            "#FF0000",
            "#A70000"
        ]);

    return (
        <div className="map">
            <ComposableMap data-tip="" projection="geoAlbersUsa">
                <ZoomableGroup zoom={1}>
                    <Geographies geography={geoUrl_states}>
                        {({geographies}) => (
                            <>
                                {geographies.map(geo => (
                                    <Geography
                                        key={geo.rsmKey}
                                        stroke="#000"
                                        fill="#FFF"
                                        geography={geo}
                                    />
                                ))}

                                );
                            </>
                        )}
                    </Geographies>
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
                            geographies.map(geo => {
                                const cur = data.find(s => s['countyFIPS'] === geo.id);
                                return (
                                    <Geography id={geo.id}
                                               key={geo.rsmKey}
                                               geography={geo}
                                               fill={cur ? colorScale(cur[col[col.length - 1]] - cur[col[col.length-2]]) : "#EEE"}
                                               onMouseEnter={() => {
                                                   if (cur != null) {
                                                       const cases = cur[col[col.length - 1]] - cur[col[col.length-2]];
                                                       setTooltipContent(cur["County Name"] + ", " + cur["State"]
                                                                         + "<br/> New Cases: " + cases);
                                                   }
                                               }}
                                               onMouseLeave={() => {
                                                   setTooltipContent("");
                                               }}
                                               style={{
                                                   hover: {
                                                       fill: "#FFFFFF",
                                                       outline: "none"
                                                   },
                                                   pressed: {
                                                       fill: "#E42",
                                                       outline: "none"
                                                   }
                                               }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <div className="info">
                Retrieved from <a href="https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/">
                usafacts.org</a> <br/>
                New confirmed cases as of: {col[col.length-1]}
            </div>
        </div>
    );
};

export default memo(MapChart);
