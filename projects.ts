import { Project } from './@types/projects'
import projects from './projects.json'

export const getSlugs = (): string[] => projects.map((p) => p.slug)

export const find = (slug: string): Project => {
  return projects.find((p) => p.slug === slug)
}

export const findAll = ({ limit = 25 }: { limit: number }): Project[] => {
  return projects.slice(0, limit)
}
