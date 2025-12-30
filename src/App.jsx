import { useEffect, useState } from "react"
import MindmapCanvas from "./components/MindmapCanvas"
import Sidebar from "./components/Sidebar"

export default function App() {
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch("/data/mindmap.json")
      .then(res => res.json())
      .then(setData)
  }, [])

  const updateNode = (updatedNode) => {
    const clone = structuredClone(data)

    const walk = (node) => {
      if (node.id === updatedNode.id) {
        node.title = updatedNode.title
        node.details = updatedNode.details
        node.summary = updatedNode.summary
      }
      node.children?.forEach(walk)
    }

    walk(clone)
    setData(clone)
    setSelected(updatedNode)
  }

  if (!data) return <div className="p-6">Loading...</div>

  return (
    <div className="flex h-screen">
      <MindmapCanvas data={data} onSelect={setSelected} />
      <Sidebar node={selected} onUpdate={updateNode} />
    </div>
  )
}

