import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import api from '../lib/axios'
import { LoaderIcon } from 'lucide-react'
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true)
  const [saving,setSaving] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()
  
  useEffect(() =>{
     const fetchNote = async () => {
    try {
      console.log("Fetching note with id:", id);
      const res = await api.get(`/notes/${id}`);
      console.log("Note response:", res.data);
      setNote(res.data.note || res.data);
    } catch (error) {
      console.log("Error in fetching note", error);
      toast.error("Failed to fetch the note");
    } finally {
      setLoading(false);
    }
  };

  fetchNote();
  },[id])

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    await api.delete(`/notes/${id}`);
    toast.success("Note deleted successfully");
    navigate("/");
  } catch (error) {
    toast.error("Failed to delete note");
    console.error("Error deleting note:", error);
  }
}

const handlesave = async()=>{
if(!note.title.trim() || !note.content.trim()){
  return toast.error("Title and content are required")
  return;
}
setSaving(true)

try {
  await api.put(`/notes/${id}`, note)
  toast.success("Note updated successfully")
  navigate("/")
} catch (error) {
  toast.error("Failed to update note")
  console.error("Error updating note:", error);
}
finally{
  setSaving(false)
}

}

  
if(loading){
  return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
}



  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
<div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
               <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">content</span>
                </label>
                <textarea
  placeholder="Note content"
  className="textarea textarea-bordered h-32"
  value={note.content}
  onChange={(e) => setNote({ ...note, content: e.target.value })}
/>
              </div>

              <div className="card-actions justify-end">
             <button className='btn btn-primary' disabled={saving} onClick={handlesave}>

              {saving ? "saving..." : "save-changes"}
             </button>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
