import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { Project } from '@/types/project'

// Helper function to dynamically get Lucide icons
const getIcon = (iconName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Link
  return Icon
}

const projects: Project[] = [
  {
    title: 'Dark Mode Enabler',
    description:
      'Open-source Chrome extension designed to help you enable Dark Mode or at least, invert colors to release your eyes from the white light of the screen.',
    image:
      'https://raw.githubusercontent.com/codesandtags/dark-mode-extension/refs/heads/main/assets/small-promo-tile.png',
    keywords: ['Google Chrome Extension', 'JavaScript'],
    links: [
      {
        icon: 'Github',
        name: 'GitHub',
        link: 'https://github.com/codesandtags/dark-mode-extension',
      },
      {
        icon: 'ExternalLink',
        name: 'Live Demo',
        link: 'https://www.codesandtags.io/dark-mode-extension/',
      },
    ],
  },
  {
    title: 'Frontend Resources',
    description:
      '🔥A curated list of awesome useful resources for Front-End. This list has been updated through my years of experience as Front-End.',
    image:
      'https://raw.githubusercontent.com/codesandtags/frontend-resources/refs/heads/main/public/images/frontend-resources-showcase.png',
    keywords: ['Documentation', 'Frontend'],
    links: [
      {
        icon: 'Github',
        name: 'GitHub',
        link: 'https://github.com/codesandtags/microfrontend-documentation',
      },
      {
        icon: 'ExternalLink',
        name: 'Live Demo',
        link: 'https://www.codesandtags.io/microfrontend-documentation/',
      },
    ],
  },
  {
    title: 'Micro Frontends Documentation ',
    description:
      'A curated list of awesome and useful resources for Micro FrontEnds, including use cases, Best practices, Frameworks, Strategies, and other resources.',
    image:
      'https://www.codesandtags.io/microfrontend-documentation/docs/images/microfrontends-mindmap.png',
    keywords: ['Documentation', 'Micro Frontends'],
    links: [
      {
        icon: 'Github',
        name: 'GitHub',
        link: 'https://github.com/codesandtags/microfrontend-documentation',
      },
      {
        icon: 'ExternalLink',
        name: 'Live Demo',
        link: 'https://www.codesandtags.io/microfrontend-documentation/',
      },
    ],
  },

  // Add more projects here
]

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.links.map((link, idx) => {
                  const Icon = getIcon(link.icon)
                  return (
                    <Link
                      key={idx}
                      href={link.link}
                      target="_blank"
                      title={link.name}
                      className="text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
                    >
                      <Icon className="h-6 w-6" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
