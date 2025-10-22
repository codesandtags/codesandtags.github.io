import type { Metadata } from 'next'
import { Briefcase, Calendar, MapPin, Award, Users, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Experience - Edwin Torres',
  description:
    "Explore Edwin Torres' professional journey as a Senior Frontend Developer at HelloFresh, Technical Lead at Scotiabank, and Software Architect. Expert in React, Next.js, TypeScript, and Micro Frontend Architecture.",
  keywords: [
    'Edwin Torres Experience',
    'HelloFresh Developer',
    'Scotiabank Technical Lead',
    'Software Architect',
    'Frontend Developer Experience',
    'Micro Frontend Architecture',
    'React Developer Portfolio',
    'Toronto Software Engineer',
  ],
  openGraph: {
    title: 'Professional Experience - Edwin Torres',
    description:
      "Explore Edwin Torres' professional journey as a Senior Frontend Developer at HelloFresh, Technical Lead at Scotiabank, and Software Architect.",
    url: 'https://codesandtags.github.io/experience',
  },
  twitter: {
    title: 'Professional Experience - Edwin Torres',
    description:
      'Senior Frontend Developer at HelloFresh, Technical Lead at Scotiabank, and Software Architect with expertise in React, Next.js, and Micro Frontend Architecture.',
  },
}

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
  type: 'work' | 'freelance' | 'project'
}

const experiences: ExperienceItem[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'HelloFresh',
    location: 'Toronto, Canada',
    period: '2025 - Present',
    description:
      'Leading frontend development for Factor Form (a sub-brand of Factor - HelloFresH) in US Market.',
    achievements: [
      'Drove end-to-end development and ownership the Trial Box initiative',
      'Successfully deployed 3 critical features to live production environments',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Jest',
      'Cypress',
    ],
    type: 'work',
  },
  {
    title: 'Technical Lead (FullStack)',
    company: 'Scotiabank | Scotia Works',
    location: 'Toronto, Canada',
    period: '2024 - 2025',
    description:
      'Drove the architecture and rollout of a Risk-Based Authentication system, coordinating across 5+ cross-functional teams. Improved fraud detection accuracy and reduced risk exposure, while ensuring alignment with enterprise security strategy.',
    achievements: [
      'Led a team of 3 Senior Engineers and 1 Engineer Manager',
      'Implemented RFC9126 Pushed Authorization Request (PAR) and RFC7636',
      'Collaborated with international teams',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'OAuth 2.0',
      'Jest',
      'Cypress',
      'Docker',
      'GCP',
      'Figma',
      'Jest',
      'Playwright',
    ],
    type: 'work',
  },
  {
    title: 'Senior Software Engineer',
    company: 'Scotiabank',
    location: 'Toronto, Canada',
    period: '2021 - 2024',
    description:
      'Led the implementation of Backstage on Anthos, enhancing the Developer Experience (DX) for over 200 engineers, VPs and directors globally through an InnerSource approach, resulting in a 20% increase in developer productivity.',
    achievements: [
      'Engineered a comprehensive system and API to extract data from 30,000 repositories to identify software reuse',
      'Helped to improve Design System adoption across the organization',
    ],
    technologies: [
      'JavaScript',
      'React',
      'TypeScript',
      'Docker',
      'Node.js',
      'Next.js',
      'Jest',
      'Playwright',
      'Figma',
    ],
    type: 'work',
  },
  {
    title: 'Software Architect, Frontend Lead',
    company: 'Scotiabank | Digital Factory',
    location: 'Bogota, Colombia',
    period: '2017 - 2021',
    description:
      'Developed technical documentation for Frontend guidelines and Software Patterns used for the projects to benefit more than 50 Frontend engineers and 12 web projects, leading to a 30% improvement in code quality and consistency',
    achievements: [
      'Pioneered the adoption of a Micro Frontend architecture, successfully integrating it into seven key applications in a distributed system using Micro Services',
      '~40% reduction in development time for new features with Micro Frontends and Design System components',
    ],
    technologies: [
      'JavaScript',
      'Angular',
      'Docker',
      'Node.js',
      'Jest',
      'Figma',
    ],
    type: 'work',
  },
  {
    title: 'Senior Software | Frontend Engineer',
    company: 'Prodigious',
    location: 'Bogota, Colombia',
    period: '2015 - 2017',
    description:
      'Helped to build the frontend solutions for several global clients, such as Renault, using Adobe AEM, Java, and JavasScript',
    achievements: [
      'Innovated a Mock-Data-Generator tool in JavaScript, reducing setup time for testing environments by 60%.',
      'Conducted 20+ end-of-sprint demos to showcase new features to clients, enhancing client understanding and feedback integration.',
    ],
    technologies: ['JavaScript', 'Adobe AEM', 'Java', 'Docker', 'Jest'],
    type: 'work',
  },
]

const skills = [
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Jest',
      'Cypress',
      'Playwright',
      'Figma',
      'Jest',
      'Playwright',
    ],
  },
  {
    category: 'Backend',
    items: [
      'Node.js',
      'Express',
      'OAuth 2.0',
      'MySQL',
      'PostgreSQL',
      'MongoDB',
    ],
  },
  {
    category: 'Tools & Others',
    items: [
      'Git',
      'Docker',
      'AWS',
      'GCP',
      'Figma',
      'Jest',
      'Playwright',
      'Statsig',
      'LaunchDarkly',
    ],
  },
]

const getTypeIcon = (type: ExperienceItem['type']) => {
  switch (type) {
    case 'work':
      return <Briefcase className="h-5 w-5" />
    case 'freelance':
      return <Users className="h-5 w-5" />
    case 'project':
      return <Code className="h-5 w-5" />
    default:
      return <Briefcase className="h-5 w-5" />
  }
}

const getTypeColor = (type: ExperienceItem['type']) => {
  switch (type) {
    case 'work':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'freelance':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'project':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export default function ExperiencePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Experience</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A journey through my professional development, showcasing the
            projects, technologies, and achievements that have shaped my career.
          </p>
        </div>

        {/* Experience Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Professional Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                )}

                <div className="flex gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    {getTypeIcon(exp.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                            exp.type
                          )}`}
                        >
                          {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Key Achievements
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-medium mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <Code className="h-6 w-6" />
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Let's Work Together</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
            Whether you're looking for a developer to join your team or need
            help with a specific project, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              View My Projects
            </a>
            <a
              href="mailto:codesandtags@gmail.com"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
