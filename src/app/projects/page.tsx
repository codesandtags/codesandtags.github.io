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
    metrics: [
      { icon: 'Users', value: '~800', label: 'weekly active users' },
      { icon: 'Download', value: '2K+', label: 'installs' },
    ],
    links: [
      {
        icon: 'Github',
        name: 'GitHub',
        link: 'https://github.com/codesandtags/dark-mode-extension',
      },
      {
        icon: 'ExternalLink',
        name: 'Live Demo',
        link: 'https://chromewebstore.google.com/detail/dark-mode-enabler/jpgjmidladomebfdpanhbeodbmkibdcp',
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
    metrics: [
      { icon: 'Star', value: '200+', label: 'GitHub stars' },
      { icon: 'BookMarked', value: '185+', label: 'resources curated' },
    ],
    links: [
      {
        icon: 'Github',
        name: 'GitHub',
        link: 'https://github.com/codesandtags/frontend-resources',
      },
      {
        icon: 'ExternalLink',
        name: 'Live Demo',
        link: 'https://frontend-resources-demo.vercel.app/',
      },
    ],
  },
  {
    title: 'Micro Frontends Documentation ',
    description:
      'A curated list of awesome and useful resources for Micro FrontEnds, including use cases, Best practices, Frameworks, Strategies, and other resources.',
    image:
      'https://raw.githubusercontent.com/codesandtags/microfrontend-documentation/main/docs/images/microfrontends-mindmap.png',
    keywords: ['Documentation', 'Micro Frontends'],
    links: [
      {
        icon: 'Github',
        name: 'GitHub',
        link: 'https://github.com/codesandtags/microfrontend-documentation',
      },

    ],
  },
  {
    title: 'Binaural Lab ',
    description:
      'High-performance Binaural Beat Generator',
    image:
      '/img/portfolio/binaural-lab-example.png',
    keywords: ['Web Audio API', 'Binaural Beats', 'JavaScript', 'PWA'],
    links: [
      {
        icon: 'Github',
        name: 'GitHub',
        link: 'https://github.com/codesandtags/binaurallab',
      },
      {
        icon: 'ExternalLink',
        name: 'Live Demo',
        link: 'https://binaurallab.vercel.app/',
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
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <div className="relative h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {project.description}
              </p>

              {project.metrics && (
                <ul
                  aria-label={`${project.title} impact`}
                  className="grid grid-cols-2 gap-3 mb-4"
                >
                  {project.metrics.map((metric) => {
                    const MetricIcon = getIcon(metric.icon)
                    return (
                      <li
                        key={metric.label}
                        className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 px-3 py-2"
                      >
                        <div className="flex items-center gap-1.5 text-primary">
                          <MetricIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="text-base font-semibold leading-none">
                            {metric.value}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">
                          {metric.label}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              )}

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
