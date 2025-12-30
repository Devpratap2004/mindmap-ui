import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

export default function MindmapCanvas({ data, onSelect }) {
  const svgRef = useRef()
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = svgRef.current.clientWidth || 800
    const height = svgRef.current.clientHeight || 600

    const g = svg.append("g").attr("transform", "translate(50,50)")

    const zoom = d3.zoom().on("zoom", e => g.attr("transform", e.transform))
    svg.call(zoom)

    const root = d3.hierarchy(data)
    const tree = d3.tree().size([height - 100, width - 200])
    tree(root)

    g.selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.y)
      .attr("y1", d => d.source.x)
      .attr("x2", d => d.target.y)
      .attr("y2", d => d.target.x)
      .attr("stroke", "#999")

    const nodes = g.selectAll("g.node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .on("mouseenter", (e, d) =>
        setTooltip({ x: e.pageX, y: e.pageY, text: d.data.summary })
      )
      .on("mouseleave", () => setTooltip(null))
      .on("click", (_, d) => onSelect(d.data))

    nodes.append("circle")
      .attr("r", 8)
      .attr("fill", "#2563eb")

    nodes.append("text")
      .text(d => d.data.title)
      .attr("dx", 12)
      .attr("dy", 4)

  }, [data, onSelect])

  return (
    <>
      <svg ref={svgRef} className="w-full h-full bg-gray-100" />
      {tooltip && (
        <div
          className="fixed bg-black text-white text-xs px-2 py-1 rounded"
          style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  )
}
