import { Calendar, MapPin, Users, ExternalLink, Clock, Mic } from 'lucide-react'

interface Talk {
  id: string
  title: string
  event: string
  date: string
  location: string
  audience: string
  duration: string
  description: string
  topics: string[]
  links: {
    type: 'slides' | 'video' | 'event' | 'article'
    url: string
    label: string
  }[]
  status: 'upcoming' | 'past'
  type: 'conference' | 'meetup' | 'workshop' | 'webinar' | 'podcast'
}

const talks: Talk[] = [
  {
    id: '1',
    title: 'State of Micro Frontends in 2021',
    event: 'Internal Tech Talk - Scotiabank',
    date: '2020-11-20',
    location: 'Toronto, Canada',
    audience: '50+ developers',
    duration: '45 minutes',
    description:
      'An overview about the state of Micro Frontends in 2021, covering what are they, why they are used, which challenges they face and how to overcome them, and finally what are the trends at that time.',
    topics: [
      'Micro Frontends',
      'Frontend Architecture',
      'Frontend Development',
    ],
    links: [{ type: 'slides', url: '#', label: 'Slides' }],
    status: 'past',
    type: 'workshop',
  },
  {
    id: '2',
    title: 'Micro Frontends and Design System adoption',
    event: 'Meetup Tech Colombia - Scotiabank',
    date: '2020-02-20',
    location: 'Bogota, Colombia',
    audience: '+50 participants',
    duration: '2 hours',
    description:
      'A deep dive into the adoption of Micro Frontends and Design System across the organization, covering the challenges faced and the solutions implemented.',
    topics: [
      'Micro Frontends',
      'Design System',
      'Frontend Architecture',
      'Frontend Development',
    ],
    links: [{ type: 'slides', url: '#', label: 'Slides' }],
    status: 'past',
    type: 'workshop',
  },
  {
    id: '3',
    title: 'Performance Optimization in JavaScript',
    event: 'JS Bogota Meetup',
    date: '2018-10-18',
    location: 'Bogota, Colombia',
    audience: '120+ participants',
    duration: '1 hours',
    description:
      'A talk about the performance optimization in JavaScript, focused on some Web Performance Metrics, Webpack Bundle Analyzer, Throttling and Debounce as techniques to improve the performance of the applications.',
    topics: [
      'JavaScript',
      'Performance',
      'Optimization',
      'Webpack Bundle Analyzer',
      'Throttling',
      'Debounce',
    ],
    links: [
      {
        type: 'slides',
        url: 'https://docs.google.com/presentation/d/14n2UMloAb3JvLt_IIAwFzC-4ssF9Q7SWA2N-nXgRTxQ/edit?usp=sharing',
        label: 'Workshop Materials',
      },
    ],
    status: 'past',
    type: 'conference',
  },
]

const getTypeIcon = (type: Talk['type']) => {
  switch (type) {
    case 'conference':
      return <Mic className="h-5 w-5" />
    case 'meetup':
      return <Users className="h-5 w-5" />
    case 'workshop':
      return <Clock className="h-5 w-5" />
    case 'webinar':
      return <ExternalLink className="h-5 w-5" />
    case 'podcast':
      return <Mic className="h-5 w-5" />
    default:
      return <Mic className="h-5 w-5" />
  }
}

const getTypeColor = (type: Talk['type']) => {
  switch (type) {
    case 'conference':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'meetup':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'workshop':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'webinar':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'podcast':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getStatusColor = (status: Talk['status']) => {
  return status === 'upcoming'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const upcomingTalks = talks.filter((talk) => talk.status === 'upcoming')
const pastTalks = talks.filter((talk) => talk.status === 'past')

export default function TalksPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Speaking Engagements</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sharing knowledge and insights through conferences, meetups,
            workshops, and webinars. Building connections and contributing to
            the developer community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {talks.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Talks</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {upcomingTalks.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Upcoming</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {pastTalks.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">2+</div>
            <div className="text-gray-600 dark:text-gray-300">Countries</div>
          </div>
        </div>

        {/* Upcoming Talks */}
        {upcomingTalks.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Upcoming Talks
            </h2>

            <div className="space-y-8">
              {upcomingTalks.map((talk) => (
                <div
                  key={talk.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-green-500"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {talk.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                        {talk.event}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 lg:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                          talk.type
                        )}`}
                      >
                        {talk.type.charAt(0).toUpperCase() + talk.type.slice(1)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          talk.status
                        )}`}
                      >
                        {talk.status.charAt(0).toUpperCase() +
                          talk.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(talk.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {talk.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {talk.audience}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {talk.duration}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {talk.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Topics Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {talk.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {talk.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Talks */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Past Talks
          </h2>

          <div className="space-y-8">
            {pastTalks.map((talk) => (
              <div
                key={talk.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                      {talk.event}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 lg:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                        talk.type
                      )}`}
                    >
                      {talk.type.charAt(0).toUpperCase() + talk.type.slice(1)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        talk.status
                      )}`}
                    >
                      {talk.status.charAt(0).toUpperCase() +
                        talk.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(talk.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {talk.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {talk.audience}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {talk.duration}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {talk.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {talk.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {talk.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Interested in Having Me Speak?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm passionate about sharing knowledge and would love to speak at
            your event. Whether it's a conference, meetup, workshop, or webinar,
            I'm always excited to connect with the developer community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:speaking@codesandtags.io"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Invite Me to Speak
            </a>
            <a
              href="/experience"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View My Experience
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
