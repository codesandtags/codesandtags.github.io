import React from 'react'
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface FeaturedItem {
  title: string
  description: string
  type: 'project' | 'blog' | 'talk' | 'learning'
  link: string
  date?: string
  isExternal?: boolean
}

const featuredItems: FeaturedItem[] = [
  {
    title: 'Senior Frontend Developer at HelloFresh',
    description:
      'Leading frontend development for Factor Form in the US Market, driving end-to-end development of critical features.',
    type: 'project',
    link: '/experience',
    date: '2025 - Present',
    isExternal: false,
  },
  {
    title: 'Micro Frontend Architecture Implementation',
    description:
      'Successfully integrated Micro Frontend architecture into seven key applications, achieving 40% reduction in development time.',
    type: 'project',
    link: '/experience',
    date: '2017 - 2021',
    isExternal: false,
  },
  {
    title: 'Backstage on Anthos Implementation',
    description:
      'Enhanced Developer Experience for 200+ engineers globally, resulting in 20% increase in developer productivity.',
    type: 'project',
    link: '/experience',
    date: '2021 - 2024',
    isExternal: false,
  },
]

const getTypeIcon = (type: FeaturedItem['type']) => {
  switch (type) {
    case 'project':
      return '🚀'
    case 'blog':
      return '📝'
    case 'talk':
      return '🎤'
    case 'learning':
      return '📚'
    default:
      return '💼'
  }
}

const getTypeColor = (type: FeaturedItem['type']) => {
  switch (type) {
    case 'project':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'blog':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'talk':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'learning':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export default function FeaturedWork() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A glimpse into my recent professional achievements and ongoing
              projects
            </p>
          </div>

          {/* Featured Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                      item.type
                    )}`}
                  >
                    {getTypeIcon(item.type)}{' '}
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  {item.isExternal ? (
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {item.date && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </div>
                )}

                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn more
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              View Full Experience
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
