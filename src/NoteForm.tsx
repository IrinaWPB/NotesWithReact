import { FormEvent, useRef, useState } from "react";
import { Form, Row, Col, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
//multi select with option to create
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App";
import { v4 as uuid } from 'uuid'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  addTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({ onSubmit, addTag, availableTags, title = "", markdown = "", tags = []}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const data: NoteData = {
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    }
    onSubmit(data)
    navigate("/")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef} defaultValue={title}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect 
                onCreateOption={label => {
                  const newTag = { id: uuid(), label }
                  addTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                } }
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(tags.map(tag => {
                    return { label: tag.label, id: tag.value }
                  }))
                }}
              isMulti/>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" rows={15} ref={markdownRef} defaultValue={markdown}/>
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">Save</Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}