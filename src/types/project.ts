export interface ProjectLink {
  icon: string
  name: string
  link: string
}

export interface ProjectMetric {
  /** Lucide icon name */
  icon: string
  /** Headline value, e.g. "~800" or "200+" */
  value: string
  /** Short label, e.g. "weekly active users" */
  label: string
}

export interface Project {
  title: string
  description: string
  image: string
  keywords: string[]
  links: ProjectLink[]
  metrics?: ProjectMetric[]
}
