import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";

const Graph = (props) => {
    const data = []
    for (let i = 4; i < props.columns.length; i++) {
        let curElement = props.collegeData[props.columns[i]];
        if (curElement < 0) {
            curElement = 0
        }
        data.push({"date": props.columns[i], "Cases": Math.round(curElement * 100) / 100})
    }
    return (
        <div className="graph">
            <h3>{props.name}</h3>
            <ResponsiveContainer width="95%" height="95%">
                <LineChart data={data}>
                    <Line dataKey="Cases" fill="#8884d8" dot={false}/>
                    <CartesianGrid/>
                    <XAxis dataKey="date" height={50}>
                        <Label value="Date" position="insideBottom"/>
                    </XAxis>
                    <YAxis label={{ offset: 10, value: "Cases", angle: -90,
                        position: "insideLeft", textAnchor: "middle"}}/>
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Graph;