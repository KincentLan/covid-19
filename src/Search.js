import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { select } from "d3-selection";
import {timeFormat, timeParse} from "d3-time-format";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent, max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { line } from "d3-shape";

const Search = () => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [curCollege, setCurCollege] = useState("");
    const [collegeData, setColData] = useState([]);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        csv('https://raw.githubusercontent.com/KincentLan/covid-19/master/public/colleges.csv').then(collegeArr => {
            const names = [];
            collegeArr.forEach(function(row) {
                names.push(row.college);
            })
            setOptions(names);
            setColleges(collegeArr);
        })
    }, [])

    useEffect(() => {
        csv("https://usafactsstatic.blob.core.windows.net/public/data/" +
            "covid-19/covid_confirmed_usafacts.csv").then(counties => {
            setData(counties);
            setColumns(counties.columns);
        });
    }, []);

    function graph(width, height, margin, y_axis, x_axis, div, graphData, dates, title) {
        const svg = select(div)
            .append('svg')
            .attr("viewBox", "0 0 500 500")
            .append("g")


        const x = scaleTime().domain(extent(graphData,
            function(d) { return d.date;})).range([0, width]);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height + margin) + ")")
            .call(axisBottom(x).ticks(7).tickFormat(timeFormat("%m/%d")));
        // Add Y axis
        const y = scaleLinear()
            .domain([0, Math.floor(max(graphData, d => d.value)/10) * 10 + 10])
            .range([ height + margin, 2 * margin ]);
        svg.append("g")
            .attr("class", "axis")
            .call(axisLeft(y));
        // Add the line
        svg.append("path")
            .datum(graphData)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 1.5)
            .attr("d", line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
            )
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -3.5 * margin)
            .attr("x",-height/2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(y_axis);
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 3.5 * margin)
            .style("text-anchor", "middle")
            .text(x_axis);
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin)
            .style("text-anchor", "middle")
            .text(title);
        // Add the points

        svg
            .append("g")
            .selectAll("dot")
            .data(graphData)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(d.date) } )
            .attr("cy", function(d) { return y(d.value) } )
            .attr("r", 5)
            .attr("fill", "#69b3a2");

    }

    useEffect(() => {
        if (collegeData != null && columns != null) {
            const graphData = [];
            const graphAvgData = [];
            const dates = []
            for (let i = columns.length - 7; i < columns.length; i++) {
                const previousSeven = [];
                for (let j = i-7; j < i; j++) {
                    previousSeven.push(collegeData[columns[j]] - collegeData[columns[j-1]]);
                }
                const curAvg = previousSeven.reduce(function(total, num) {
                    return total + num;})/previousSeven.length;
                graphAvgData.push({date: timeParse("%m/%d/%Y")(columns[i] + "20"),
                    value: curAvg});
                dates.push(columns[i] + "20");
                graphData.push({date: timeParse("%m/%d/%Y")(columns[i] + "20"),
                    value: collegeData[columns[i]] - collegeData[columns[i-1]]})
            }
            graph(400, 400, 20, "New Cases",
                "Date", "#daily_cases", graphData, dates, "Daily New Cases");
            graph(400, 400, 20, "Average New Cases",
                "Date", "#seven_day_avg", graphAvgData, dates, "7-Day Moving Average");
        }
    });

    function onChange(event) {
        setSearch(event.target.value);
        const college = colleges.find(s => s.college.toLowerCase() === event.target.value.toLowerCase());
        if (college != null) {
            setCurCollege(college);
            setColData(data.find(s => s.countyFIPS === college.countyFIPS));
            setDisplay(true);
        }
        else {
            setDisplay(false);
        }
    }

    return (
        <div className="search-div">
            <input
                type="search"
                autoComplete="on"
                list="options"
                className="search"
                onChange={event => onChange(event)}
                placeholder="Type to search for your college."
                value={search}
            />
            <datalist id="options">
                {options
                    .filter(name => name.toLowerCase().includes(search.toLowerCase()))
                    .slice(0, 10)
                    .map((value, i) => {
                        return (
                            <option
                                className="option"
                                key={i}
                                tabIndex="0"
                            >
                                {value}
                            </option>
                        );
                    })
                    }
            </datalist>
            {display && (
               <div className="college">
                   <h1>{curCollege.college}</h1>
                   <h2>{collegeData["County Name"] + ", " + curCollege.state}</h2>
                   <h3>New confirmed cases in {collegeData["County Name"]} as of {columns[columns.length-1]}: {
                       collegeData[columns[columns.length-1]] - collegeData[columns[columns.length-2]]} confirmed cases</h3>
                   <div className="float-container">
                       <div className="graph">
                           <svg id="daily_cases"/>
                       </div>
                       <div className="graph">
                           <svg id="seven_day_avg"/>
                       </div>
                   </div>
               </div>
            )}
        </div>
    );
};

export default Search;