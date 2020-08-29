import React, { memo } from "react";
import {ZoomableGroup, ComposableMap, Geographies, Geography} from "react-simple-maps";
import {scaleThreshold} from "d3-scale";

const geoUrl_counties = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const geoUrl_states = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

function filterNegative(x) {
    if (x < 0) {
        return 0;
    }
    return x;
}
const MapChart = (props) => {
    const cases = props.cases.map(x => filterNegative(x));
    const deaths = props.deaths.map(x => filterNegative(x));
    const columns = props.columns;
    const column_deaths = props.column_deaths
    const cases_date_idx = columns.length - 1;
    const deaths_date_idx = props.column_deaths.length - 1;

    for (let i = 0; i < cases.length; i++) {
        if (cases[i]['countyFIPS'].length === 4) {
            cases[i]['countyFIPS'] = "0" + cases[i]['countyFIPS'];
        }
        if (i < deaths.length && deaths[i]['countyFIPS'].length === 4) {
            deaths[i]['countyFIPS'] = "0" + deaths[i]['countyFIPS'];
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
                    <Geographies geography={geoUrl_counties}>
                        {({geographies}) =>
                            geographies.map(geo => {
                                const curCases = cases.find(s => s['countyFIPS'] === geo.id);
                                const curDeaths = deaths.find(s => s['countyFIPS'] === geo.id);
                                let last_case = 0, last_death = 0;
                                if (curCases !== void(0) && curDeaths !== void(0)) {
                                    last_case = curCases[columns[cases_date_idx]] - curCases[columns[cases_date_idx-1]];
                                    last_death =
                                        curDeaths[column_deaths[deaths_date_idx]]
                                        - curDeaths[column_deaths[deaths_date_idx-1]];
                                }
                                return (
                                    <Geography id={geo.id}
                                               key={geo.rsmKey}
                                               geography={geo}
                                               fill={curCases ? colorScale(last_case) : "#EEE"}
                                               onMouseEnter={() => {
                                                   if (curCases !== void(0)) {
                                                       props.setTooltipContent(
                                                           curCases["County Name"] + ", " + curCases["State"]
                                                           + "<br/> New Cases: " + last_case
                                                           + "<br/> New Deaths: " + last_death);
                                                   }
                                               }}
                                               onMouseLeave={() => {
                                                   props.setTooltipContent("");
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
                New confirmed cases as of: {columns[cases_date_idx]}
            </div>
        </div>
    );
};

export default memo(MapChart);
