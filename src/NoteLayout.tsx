import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from './App'

type NoteLayoutProps = { 
  notes: Note[]
}
export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams()
  const note = notes.find(n => n.id === id)
  
  //if can not find this id navigates back to home page 
  if (note == null) return <Navigate to='/' replace/>

  //returns a child depening on url
  return <Outlet context={note} />
}
//use inside of outlets, gives all info.
export function useNote() {
  return useOutletContext<Note>()
}