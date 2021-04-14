import { ReactElement } from 'react'

export interface Project {
  name: string
  description: string
  background: string
  slug: string
  github?: string
  call_to_action: string
  url: string
  stack?: string[]
  tags?: string[]
  content?: Content[]
}

type ContentType = string | ReactElement

type Content = [CotnentType, ContentType]
