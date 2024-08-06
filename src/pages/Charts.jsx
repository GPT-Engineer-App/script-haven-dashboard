import React from 'react';
import * as d3 from 'd3';

export const BarChart = ({ data }) => {
  React.useEffect(() => {
    d3.select('#bar-chart').selectAll('*').remove();
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(data.map(d => d[Object.keys(d)[0]]));
    y.domain([0, d3.max(data, d => +d[Object.keys(d)[1]])]);

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d[Object.keys(d)[0]]))
      .attr('width', x.bandwidth())
      .attr('y', d => y(+d[Object.keys(d)[1]]))
      .attr('height', d => height - y(+d[Object.keys(d)[1]]))
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return <div id="bar-chart"></div>;
};

export const LineChart = ({ data }) => {
  React.useEffect(() => {
    d3.select('#line-chart').selectAll('*').remove();
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#line-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .range([0, width]);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(+d[Object.keys(d)[0]]))
      .y(d => y(+d[Object.keys(d)[1]]));

    x.domain(d3.extent(data, d => +d[Object.keys(d)[0]]));
    y.domain([0, d3.max(data, d => +d[Object.keys(d)[1]])]);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return <div id="line-chart"></div>;
};

export const ScatterPlot = ({ data }) => {
  React.useEffect(() => {
    d3.select('#scatter-plot').selectAll('*').remove();
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#scatter-plot')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .range([0, width]);

    const y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(d3.extent(data, d => +d[Object.keys(d)[0]]));
    y.domain([0, d3.max(data, d => +d[Object.keys(d)[1]])]);

    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(+d[Object.keys(d)[0]]))
      .attr('cy', d => y(+d[Object.keys(d)[1]]))
      .attr('r', 5)
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return <div id="scatter-plot"></div>;
};

export const PieChart = ({ data }) => {
  React.useEffect(() => {
    d3.select('#pie-chart').selectAll('*').remove();
    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => +d[Object.keys(d)[1]]);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data[Object.keys(d.data)[0]]);
  }, [data]);

  return <div id="pie-chart"></div>;
};
