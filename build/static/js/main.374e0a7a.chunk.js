(this["webpackJsonpusa-counties-choropleth-map-quantile"]=this["webpackJsonpusa-counties-choropleth-map-quantile"]||[]).push([[0],{192:function(e,t,a){e.exports=a(381)},199:function(e,t,a){},381:function(e,t,a){"use strict";a.r(t);var n=a(9),c=a(1),o=a.n(c),l=a(63),r=a.n(l),s=a(162),u=(a(199),a(26)),i=a(388),m=a(48),f=Object(c.memo)((function(e){var t=e.setTooltipContent,a=Object(c.useState)([]),l=Object(n.a)(a,2),r=l[0],s=l[1],f=Object(c.useState)([]),h=Object(n.a)(f,2),p=h[0],d=h[1];Object(c.useEffect)((function(){Object(m.a)("https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_confirmed_usafacts.csv").then((function(e){s(e),d(e.columns)}))}),[]);for(var g=0;g<r.length;g++)4===r[g].countyFIPS.length&&(r[g].countyFIPS="0"+r[g].countyFIPS);var E=Object(i.a)().domain([0,5,10,50,100,500,1e3,5e3,Number.MAX_SAFE_INTEGER]).range(["#FFF2F2","#FFE5E5","#FFC6C6","#FFAAAA","#FF6868","#FD4646","#FF0F00","#FF0000","#A70000"]);return o.a.createElement("div",{className:"map"},o.a.createElement(u.ComposableMap,{"data-tip":"",projection:"geoAlbersUsa"},o.a.createElement(u.ZoomableGroup,{zoom:1},o.a.createElement(u.Geographies,{geography:"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"},(function(e){var t=e.geographies;return o.a.createElement(o.a.Fragment,null,t.map((function(e){return o.a.createElement(u.Geography,{key:e.rsmKey,stroke:"#000",fill:"#FFF",geography:e})})),");")})),o.a.createElement(u.Geographies,{geography:"https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"},(function(e){return e.geographies.map((function(e){var a=r.find((function(t){return t.countyFIPS===e.id})),n=0;return null!=a&&(n=a[p[p.length-1]]-a[p[p.length-2]])<0&&(n=0),o.a.createElement(u.Geography,{id:e.id,key:e.rsmKey,geography:e,fill:a?E(n):"#EEE",onMouseEnter:function(){null!=a&&t(a["County Name"]+", "+a.State+"<br/> New Cases: "+n)},onMouseLeave:function(){t("")},style:{hover:{fill:"#FFFFFF",outline:"none"},pressed:{fill:"#E42",outline:"none"}}})}))})))),o.a.createElement("div",{className:"info"},"Retrieved from ",o.a.createElement("a",{href:"https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/"},"usafacts.org")," ",o.a.createElement("br",null),"New confirmed cases as of: ",p[p.length-1]))})),h=a(16),p=function(e){for(var t=[],a=e.columns.length-7;a<e.columns.length;a++)t.push({date:e.columns[a],cases:e.collegeData[e.columns[a]]});return console.log(e.collegeData),o.a.createElement("div",{className:"graph"},o.a.createElement("h3",null,e.name),o.a.createElement(h.e,{width:"90%",height:"90%"},o.a.createElement(h.d,{width:600,height:300,data:t},o.a.createElement(h.c,{dataKey:"cases",fill:"#8884d8"}),o.a.createElement(h.a,null),o.a.createElement(h.g,{dataKey:"date",height:50},o.a.createElement(h.b,{value:"Date",position:"insideBottom"})),o.a.createElement(h.h,{label:{offset:10,value:"New Cases",angle:-90,position:"insideLeft",textAnchor:"middle"}}),o.a.createElement(h.f,null))))},d=function(){var e=Object(c.useState)(!1),t=Object(n.a)(e,2),a=t[0],l=t[1],r=Object(c.useState)([]),s=Object(n.a)(r,2),u=s[0],i=s[1],f=Object(c.useState)([]),h=Object(n.a)(f,2),d=h[0],g=h[1],E=Object(c.useState)(""),b=Object(n.a)(E,2),v=b[0],j=b[1],F=Object(c.useState)([]),O=Object(n.a)(F,2),y=O[0],S=O[1],w=Object(c.useState)([]),N=Object(n.a)(w,2),C=N[0],A=N[1],I=Object(c.useState)([]),D=Object(n.a)(I,2),L=D[0],k=D[1],G=Object(c.useState)(""),P=Object(n.a)(G,2),_=P[0],K=P[1];return Object(c.useEffect)((function(){Object(m.a)("https://raw.githubusercontent.com/KincentLan/covid-19/master/public/colleges.csv").then((function(e){var t=[];e.forEach((function(e){t.push(e.college)})),i(t),g(e)}))}),[]),Object(c.useEffect)((function(){Object(m.a)("https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_confirmed_usafacts.csv").then((function(e){A(e),k(e.columns)}))}),[]),o.a.createElement("div",{className:"search-div"},o.a.createElement("input",{type:"search",autoComplete:"on",list:"options",className:"search",onChange:function(e){return function(e){K(e.target.value);var t=d.find((function(t){return t.college.toLowerCase()===e.target.value.toLowerCase()}));null!=t?(j(t),S(C.find((function(e){return e.countyFIPS===t.countyFIPS}))),l(!0)):l(!1)}(e)},placeholder:"Type to search for your college.",value:_}),o.a.createElement("datalist",{id:"options"},u.filter((function(e){return e.toLowerCase().includes(_.toLowerCase())})).slice(0,10).map((function(e,t){return o.a.createElement("option",{className:"option",key:t,tabIndex:"0"},e)}))),a&&o.a.createElement("div",{className:"college"},o.a.createElement("h1",null,v.college),o.a.createElement("h2",null,y["County Name"]+", "+v.state),o.a.createElement("h3",null,"New confirmed cases in ",y["County Name"]," as of ",L[L.length-1],": ",y[L[L.length-1]]-y[L[L.length-2]]," confirmed cases"),o.a.createElement("div",{className:"float-container"},o.a.createElement(p,{name:"Daily New Cases",collegeData:function(){for(var e={},t=4;t<L.length;t++)e[L[t]]=4===t?y[L[t]]:y[L[t]]-y[L[t-1]];return e}(),columns:L}),o.a.createElement(p,{name:"Seven-Day Moving Average",collegeData:function(){for(var e={},t=11;t<L.length;t++){for(var a=[],n=t-7;n<t;n++)y[L[n]]-y[L[n-1]]<0||4===n?a.push(0):a.push(y[L[n]]-y[L[n-1]]);e[L[t]]=a.reduce((function(e,t){return e+t}))/a.length}return e}(),columns:L}))))};function g(){var e=Object(c.useState)(""),t=Object(n.a)(e,2),a=t[0],l=t[1];return o.a.createElement("div",null,o.a.createElement(f,{setTooltipContent:l}),o.a.createElement(s.a,{html:!0},a),o.a.createElement(d,null))}var E=document.getElementById("root");r.a.render(o.a.createElement(g,null),E)}},[[192,1,2]]]);
//# sourceMappingURL=main.374e0a7a.chunk.js.map