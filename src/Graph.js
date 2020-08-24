import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";

const Graph = (props) => {
    const data = []
    for (let i = props.columns.length - 7; i < props.columns.length; i++) {
        data.push({"date": props.columns[i],
            "cases": props.collegeData[props.columns[i]]})
    }
    console.log(props.collegeData)
    return (
        <div className="graph">
            <h3>{props.name}</h3>
            <ResponsiveContainer width="90%" height="90%">
                <LineChart width={600} height={300} data={data}>
                    <Line dataKey="cases" fill="#8884d8"/>
                    <CartesianGrid/>
                    <XAxis dataKey="date" height={50}>
                        <Label value="Date" position="insideBottom"/>
                    </XAxis>
                    <YAxis label={{ offset: 10, value: "New Cases", angle: -90,
                        position: "insideLeft", textAnchor: "middle"}}/>
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Graph;