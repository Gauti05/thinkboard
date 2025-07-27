import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../lib/axios'

const CreatePage = () => {
  const[title, setTitle] = useState("")
  const[content,setContent] = useState("")
  const[loading, setLoading] = useState(false)  
  const navigate = useNavigate()


  const handlesubmit = async(e) =>{
    e.preventDefault()
if(!title.trim() || !content.trim()){
  toast.error("title and content are required")
  return
}
setLoading(true)
try {
  await api.post("/notes",{
    title,
    content
  })
  // toast.s("note created successfully")
 toast.success("note created successfully");

setTimeout(() => {
  navigate("/");
}, 1000); 
} catch (error) {
  console.error("error is coming",error)
  if(error.response.status == 429){
   toast.error(
    <span>
      <span role="img" aria-label="skull">💀</span> Slow down! You're creating notes too fast
    </span>,
    { autoClose: 4000 }
  );
  }
  else{

  }
  toast.error("something went wrong")
}
finally{
  setLoading(false)
}

  }

  return (
<div className='min-h-screen bg-base-200'>
  <div className='container mx-auto px-4 py-8'>
<div className='max-w-2xl mx-auto'>
<Link to={"/"} className='btn btn-ghost mb-6'>
<ArrowLeftIcon className='size-5'/>
Back to notes
</Link>
<div className='card bg-base-100'>
<div className='card-body'>
<h2 className='card-title text-2xl mb-4'>Create new note</h2>
<form onSubmit={handlesubmit}>
<div className='form-control mb-4'>
<label  className="label">
  <span className='label-text'>title</span>
</label>
<input type='text'
placeholder='note title'
className='input input-bordered'
value={title}
onChange={(e) => setTitle(e.target.value)}
 
/>
</div>


<div className='form-control mb-4'>
<label  className="label">
  <span className='label-text'>CONTENT</span>
</label>
<input type='text'
placeholder='note content'
className='input input-bordered h-32'
value={content}
onChange={(e) => setContent(e.target.value)}
 
/>
</div>

<div className="card-actions justify-end">
  <button type='submit' className='btn btn-primary' disabled={loading}>

    {loading ? "creating..." : "create note"}
  </button>
</div>

</form>
</div>
</div>

</div>
  </div>
</div>
)

}

export default CreatePage;


// export default function App() {
//   return (
//     <>
//       <CreatePage />
//       <ToastContainer />
//     </>
//   );
// }
