import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const BubbleChart = ({ data }) => {
  const ref = useRef();
  const simulationRef = useRef(null);

  useEffect(() => {
    if (!simulationRef.current) {
      setupSimulation();
    } else {
      simulationRef.current.nodes(data).alpha(0.5).restart(); // 适当提高 alpha 值以重新激活模拟
    }
  }, [data]);

  const setupSimulation = () => {
    const svg = d3.select(ref.current);
    const width = 893;
    const height = 400;
    svg.attr('width', width).attr('height', height).attr('style');

    simulationRef.current = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => d.radius + 10))
      .velocityDecay(0.2) // 减少速度衰减以稳定移动
      .on('tick', ticked);

    const node = svg.selectAll('.bubble')
      .data(data, d => d.id)  // 假设每个数据点有一个唯一的 'id'
      .join('g')
      .attr('class', 'bubble');

    node.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => d.color)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append('text')
      .text(d => `${d.tag}: ${d.value}`)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', 12)
      .style('pointer-events', 'none');

    function ticked() {
      node.attr('transform', d => `translate(${Math.max(d.radius, Math.min(width - d.radius, d.x))}, ${Math.max(d.radius, Math.min(height - d.radius, d.y))})`);
    }

    function dragstarted(event, d) {
      if (!event.active) simulationRef.current.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = Math.max(d.radius, Math.min(width - d.radius, event.x));
      d.fy = Math.max(d.radius, Math.min(height - d.radius, event.y));
    }

    function dragended(event, d) {
      if (!event.active) simulationRef.current.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };

  return <svg ref={ref}></svg>;
};

export default BubbleChart;
