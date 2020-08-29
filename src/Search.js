import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import Graph from "./Graph";

const Search = (props) => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [curCollege, setCurCollege] = useState("");
    const [collegeData, setColData] = useState([]);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        csv('https://raw.githubusercontent.com/KincentLan/covid-19/' +
            'master/public/colleges.csv').then(collegeArr => {
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

    function sevenDayAvg() {
        const collegeDataAvg = {};
        for (let i = 11; i < columns.length; i++) {
            const sevenCases = [];
            for (let j = i - 7; j < i; j++) {
                if (collegeData[columns[j]] - collegeData[columns[j-1]] < 0 || j === 4) {
                    sevenCases.push(0);
                }
                else {
                    sevenCases.push(collegeData[columns[j]] - collegeData[columns[j - 1]]);
                }
            }
            collegeDataAvg[columns[i]] = sevenCases.reduce(function(a, b) {return a + b})/sevenCases.length;
        }
        return collegeDataAvg;
    }

    function dailyCases() {
        const dailyCases = {};
        for (let i = 4; i < columns.length; i++) {
            if (i === 4) {
                dailyCases[columns[i]] = collegeData[columns[i]];
            }
            else {
                dailyCases[columns[i]] = collegeData[columns[i]] - collegeData[columns[i-1]];
            }
        }
        return dailyCases;
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
                        collegeData[columns[columns.length-1]] - collegeData[columns[columns.length-2]]} confirmed cases
                    </h3>
                    <div className="float-container">
                        <Graph name="Daily New Cases" collegeData={dailyCases()} columns={columns}/>
                        <Graph name="Seven-Day Moving Average" collegeData={sevenDayAvg()} columns={columns}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;