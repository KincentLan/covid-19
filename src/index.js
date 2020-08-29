import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import "./styles.css";

import MapChart from "./MapChart";
import Search from "./Search";
import {csv} from "d3-fetch";

function App() {
    const [cases, setCases] = useState([]);
    const [deaths, setDeaths] = useState([]);
    const [columns, setColumns] = useState([]);
    const [columnsDeaths, setColumnsDeaths] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        csv("https://usafactsstatic.blob.core.windows.net/public/data/" +
            "covid-19/covid_confirmed_usafacts.csv").then(data => {
            setCases(data);
            setColumns(data.columns);
        });
    }, []);

    useEffect(() => {
        csv("https://usafactsstatic.blob.core.windows.net/public/data/" +
            "covid-19/covid_deaths_usafacts.csv").then(data => {
            setDeaths(data);
            setColumnsDeaths(data.columns);
        });
    }, [])

    return (
        <div>
            <MapChart column_deaths={columnsDeaths} columns={columns}
                      cases={cases} deaths={deaths} setTooltipContent={setContent} />
            <ReactTooltip html={true}>{content}</ReactTooltip>
            <Search column_deaths={columnsDeaths} columns={columns} cases={cases} deaths={deaths} />
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
