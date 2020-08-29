import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import Graph from "./Graph";

const Search = (props) => {
    const deaths = props.deaths;
    const cases = props.cases;
    const columns = props.columns;
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [curCollege, setCurCollege] = useState("");
    const [collegeCases, setCollegeCases] = useState([]);
    const [collegeDeaths, setCollegeDeaths] = useState([]);
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

    function onChange(event) {
        setSearch(event.target.value);
        const college = colleges.find(s => s.college.toLowerCase() === event.target.value.toLowerCase());
        if (college != null) {
            setCurCollege(college);
            setCollegeCases(cases.find(s => parseInt(s.countyFIPS) === parseInt(college.countyFIPS)));
            setCollegeDeaths(deaths.find(s => parseInt(s.countyFIPS) === parseInt(college.countyFIPS)));
            setDisplay(true);
        }
        else {
            setDisplay(false);
        }
    }

    function sevenDayDailyAvg(arr) {
        const collegeDataAvg = {};
        for (let i = 11; i < columns.length; i++) {
            const sevenCases = [];
            for (let j = i - 7; j < i; j++) {
                if (arr[columns[j]] - arr[columns[j-1]] < 0 || j === 4) {
                    sevenCases.push(0);
                }
                else {
                    sevenCases.push(arr[columns[j]] - arr[columns[j - 1]]);
                }
            }
            collegeDataAvg[columns[i]] = sevenCases.reduce(function(a, b) {return a + b})/sevenCases.length;
        }
        return collegeDataAvg;
    }

    function dailyCases(arr) {
        const dailyCases = {};
        for (let i = 4; i < columns.length; i++) {
            if (i === 4) {
                dailyCases[columns[i]] = arr[columns[i]];
            }
            else {
                dailyCases[columns[i]] = arr[columns[i]] - arr[columns[i-1]];
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
                    <h2>{collegeCases["County Name"] + ", " + curCollege.state}</h2>
                    <h3>New confirmed cases in {collegeCases["County Name"]} as of {columns[columns.length-1]}: {
                        collegeCases[columns[columns.length-1]] - collegeCases[columns[columns.length-2]]} confirmed cases
                    </h3>
                    <div className="float-container">
                        <Graph name="Daily New Cases" collegeData={dailyCases(collegeCases)} columns={columns}/>
                        <Graph name="Seven-Day Moving Average (New Cases)" collegeData={sevenDayDailyAvg(collegeCases)} columns={columns}/>
                    </div>
                    <div className="float-container">
                        <Graph name="Daily New Deaths" collegeData={dailyCases(collegeDeaths)} columns={columns}/>
                        <Graph name="Seven-Day Moving Average (New Deaths)" collegeData={sevenDayDailyAvg(collegeDeaths)} columns={columns}/>
                    </div>
                    <div className="float-container">
                        <Graph name="Cumulative Cases" collegeData={collegeCases} columns={columns}/>
                        <Graph name="Cumulative Deaths" collegeData={collegeDeaths} columns={columns}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;