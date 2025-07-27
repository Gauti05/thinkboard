import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import RateLimitedUi from '../Components/RateLimitedUi'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../Components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../Components/NotesNotFound'
const Home = () => {
  const [rateLimited, setRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        // console.log(res.data)
        setNotes(res.data)
       setRateLimited(false)
        // setLoading(false)
      } catch (error) {
        console.error("Error fetching notes:", error)
        if(error.response.status === 429){
          setRateLimited(true)
        }else{
          toast.error("failed to load notes")
        }
      }
      finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen'>
      <NavBar />
      {rateLimited && <RateLimitedUi />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        {notes.length === 0 && !rateLimited && <NotesNotFound/>}
        {notes.length > 0 &&  !rateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
{notes.map((note )=> (
  <NoteCard key={note._id} note={note} setNotes={setNotes}/>
))}
            </div>
        )}

      </div>
    </div>
  )
}

export default Home