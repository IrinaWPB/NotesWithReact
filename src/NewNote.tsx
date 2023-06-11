import { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  addTag: (tag: Tag) => void
  availableTags: Tag[]

}
export function NewNote({ onSubmit, addTag, availableTags }: NewNoteProps) {
  return <>
    <h1>New Note</h1>
    <NoteForm onSubmit={ onSubmit } addTag={addTag} availableTags={availableTags}/>
  </>
}