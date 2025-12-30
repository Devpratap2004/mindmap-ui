export default function EditNode({ node, onSave, onClose }) {
  const [title,setTitle]=useState(node.title)
  const [details,setDetails]=useState(node.details)

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 w-80">
        <input value={title} onChange={e=>setTitle(e.target.value)}
          className="border p-1 w-full"/>
        <textarea value={details} onChange={e=>setDetails(e.target.value)}
          className="border p-1 w-full mt-2"/>
        <div className="flex justify-end mt-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={()=>onSave({...node,title,details})}
            className="ml-2 bg-blue-600 text-white px-2">Save</button>
        </div>
      </div>
    </div>
  )
}
