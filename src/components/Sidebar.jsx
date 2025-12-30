import { useState } from "react"
import EditNode from "./EditNode"

export default function Sidebar({ node, onUpdate }) {
  const [edit, setEdit] = useState(false)

  if (!node)
    return <div className="w-72 p-4 border-l">Select a node</div>

  const handleSave = (updated) => {
    onUpdate(updated)
    setEdit(false)
  }

  return (
    <div className="w-72 p-4 border-l bg-white">
      <h2 className="font-bold text-xl">{node.title}</h2>
      <p className="mt-2 text-sm text-gray-700">{node.details}</p>

      <button
        onClick={() => setEdit(true)}
        className="mt-4 bg-blue-600 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      {edit && (
        <EditNode
          node={node}
          onSave={handleSave}
          onClose={() => setEdit(false)}
        />
      )}
    </div>
  )
}
