export interface ProjectLink {
  icon: string
  name: string
  link: string
}

export interface Project {
  title: string
  description: string
  image: string
  keywords: string[]
  links: ProjectLink[]
}
