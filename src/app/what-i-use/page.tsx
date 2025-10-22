import type { Metadata } from 'next'
import {
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Mic,
  Code,
  Video,
  Settings,
  BookOpen,
  CheckSquare,
  FileText,
  Palette,
  Zap,
  ExternalLink,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "What I Use - Edwin Torres' Development Setup",
  description:
    "Discover the tools, hardware, and software that power Edwin Torres' daily workflow. From VS Code extensions to hardware setup, learn about the development environment of a Senior Frontend Developer.",
  keywords: [
    'Edwin Torres Tools',
    'Developer Setup',
    'VS Code Extensions',
    'Development Tools',
    'Frontend Developer Setup',
    'Software Tools',
    'Hardware Setup',
    'Developer Workflow',
    'codesandtags Tools',
  ],
  openGraph: {
    title: "What I Use - Edwin Torres' Development Setup",
    description:
      "Discover the tools, hardware, and software that power Edwin Torres' daily workflow as a Senior Frontend Developer.",
    url: 'https://codesandtags.github.io/what-i-use',
  },
  twitter: {
    title: "What I Use - Edwin Torres' Development Setup",
    description:
      'Tools, hardware, and software setup of a Senior Frontend Developer. VS Code extensions, development tools, and workflow insights.',
  },
}

interface ToolItem {
  name: string
  description: string
  category: string
  icon?: React.ReactNode
  link?: string
}

const tools: ToolItem[] = [
  // Software - Development
  {
    name: 'Cursor',
    description:
      'Recently, I started using Cursor as my AI assistant for coding.',
    category: 'Development',
    icon: <Code className="h-5 w-5" />,
    link: 'https://cursor.sh',
  },
  {
    name: 'Visual Studio Code',
    description: 'Since 3 years ago I moved from IntelliJ to VSCode.',
    category: 'Development',
    icon: <Code className="h-5 w-5" />,
    link: 'https://code.visualstudio.com',
  },
  {
    name: 'Warp',
    description:
      'I use Warp to manage my local development environment as an alternative to iTerm2.',
    category: 'Development',
    icon: <Monitor className="h-5 w-5" />,
    link: 'https://www.warp.dev',
  },
  {
    name: 'Docker Desktop',
    description:
      'I use Docker Desktop to run my local docker containers or pods on Kubernetes.',
    category: 'Development',
    icon: <Code className="h-5 w-5" />,
    link: 'https://www.docker.com/products/docker-desktop',
  },
  {
    name: 'Brave browser',
    description:
      'I use Brave browser as my main browser. I moved from Chrome, so I love the privacy and ad blocker features. However, I am curious about using Arc',
    category: 'Development',
    icon: <Monitor className="h-5 w-5" />,
    link: 'https://brave.com',
  },
  {
    name: 'Postman',
    description: 'I use Postman as my REST client.',
    category: 'Development',
    icon: <Code className="h-5 w-5" />,
    link: 'https://www.postman.com',
  },

  // Software - Video
  {
    name: 'OBS',
    description: 'I use OBS to record my videos.',
    category: 'Video',
    icon: <Video className="h-5 w-5" />,
    link: 'https://obsproject.com',
  },
  {
    name: 'Capcut',
    description: 'I use Capcut to edit my videos.',
    category: 'Video',
    icon: <Video className="h-5 w-5" />,
    link: 'https://www.capcut.com',
  },

  // Hardware
  {
    name: 'MacBook Pro M3',
    description: 'I use a MacBook Pro M3 as my main computer.',
    category: 'Computer',
    icon: <Monitor className="h-5 w-5" />,
  },
  {
    name: 'iPhone 16',
    description: 'I use an iPhone 16 as my main phone.',
    category: 'Phone',
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    name: 'iPad Pro 11',
    description: 'I use an iPad Pro 11 as my main tablet.',
    category: 'Tablet',
    icon: <Tablet className="h-5 w-5" />,
  },
  {
    name: 'Garmin Venu 2',
    description: 'I use a Garmin Venu 2 as my main watch and for my sports.',
    category: 'Watch',
    icon: <Watch className="h-5 w-5" />,
  },
  {
    name: 'Sony WH-CH700N',
    description:
      'I have been using these headphones for 5 years now, and I love them, mainly because of the noise cancellation feature.',
    category: 'Headphones',
    icon: <Headphones className="h-5 w-5" />,
    link: 'https://www.sony.ca/en/electronics/headband-headphones/wh-ch700n',
  },
  {
    name: 'Audio Technica AT2020',
    description:
      'I use Audio Technica AT2020 as my main microphone to record my videos.',
    category: 'Recording',
    icon: <Mic className="h-5 w-5" />,
  },
  {
    name: 'Dell UltraSharp U2723QE',
    description: 'I use a Dell UltraSharp U2723QE as my main monitor.',
    category: 'Monitor',
    icon: <Monitor className="h-5 w-5" />,
  },

  // VS Code Extensions
  {
    name: 'Dracula at Night',
    description: 'I use Dracula at Night as my VS Code theme.',
    category: 'VS Code Extensions',
    icon: <Palette className="h-5 w-5" />,
    link: 'https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula-at-night',
  },
  {
    name: 'Material Icon Theme',
    description: 'I use Material Icon Theme as my VS Code icons theme.',
    category: 'VS Code Extensions',
    icon: <Palette className="h-5 w-5" />,
    link: 'https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme',
  },
  {
    name: 'Prettier - Code formatter',
    description: 'I use Prettier - Code formatter as my VS Code formatter.',
    category: 'VS Code Extensions',
    icon: <Code className="h-5 w-5" />,
    link: 'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode',
  },
  {
    name: 'Error lens',
    description: 'I use Error lens as my VS Code error lens.',
    category: 'VS Code Extensions',
    icon: <Code className="h-5 w-5" />,
  },
  {
    name: 'Markmap',
    description: 'I use Markmap as my VS Code mind map.',
    category: 'VS Code Extensions',
    icon: <FileText className="h-5 w-5" />,
  },

  // Study and Learning
  {
    name: "O'Reilly",
    description: "I use O'Reilly to learn new technologies and reports.",
    category: 'Study and Learning',
    icon: <BookOpen className="h-5 w-5" />,
    link: 'https://www.oreilly.com',
  },
  {
    name: 'Frontend Masters',
    description: 'I use Frontend Masters to learn new technologies.',
    category: 'Study and Learning',
    icon: <BookOpen className="h-5 w-5" />,
    link: 'https://frontendmasters.com/u/codesandtags_/',
  },
  {
    name: 'GreatFrontend',
    description:
      'I use GreatFrontend to keep learning and improving my skills in Frontend, and overall the community is great and helpful.',
    category: 'Study and Learning',
    icon: <BookOpen className="h-5 w-5" />,
    link: 'https://www.greatfrontend.com/',
  },

  {
    name: 'Goodreads',
    description:
      'I love reading to learn new things. I use Goodreads to track my reading progress.',
    category: 'Study and Learning',
    icon: <BookOpen className="h-5 w-5" />,
    link: 'https://www.goodreads.com',
  },

  // Productivity
  {
    name: 'Notion',
    description: 'I use Notion to manage my notes and projects.',
    category: 'Productivity',
    icon: <FileText className="h-5 w-5" />,
    link: 'https://www.notion.so',
  },
  {
    name: 'Dark Mode Enabler',
    description: 'I use Dark Mode Enabler to enable dark mode on websites.',
    category: 'Productivity',
    icon: <Settings className="h-5 w-5" />,
  },
]

const categories = [
  { name: 'Software', subcategories: ['Development', 'Video'] },
  {
    name: 'Hardware',
    subcategories: [
      'Computer',
      'Phone',
      'Tablet',
      'Watch',
      'Headphones',
      'Recording',
      'Monitor',
    ],
  },
  { name: 'Configurations', subcategories: ['VS Code Extensions'] },
  { name: 'Others', subcategories: ['Study and Learning', 'Productivity'] },
]

export default function WhatIUsePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">What I Use</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of the tools, hardware, and software that
            power my daily workflow and productivity.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.name} className="space-y-8">
              {/* Category Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
              </div>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory} className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                      {subcategory}
                    </h3>

                    <div className="space-y-3">
                      {tools
                        .filter((tool) => tool.category === subcategory)
                        .map((tool, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-primary/20 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5 text-primary">
                                {tool.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {tool.name}
                                  </h4>
                                  {tool.link && (
                                    <a
                                      href={tool.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:text-primary/80 transition-colors"
                                      aria-label={`Visit ${tool.name} website`}
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {tool.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            Questions About My Setup?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Curious about any of the tools I use or want to discuss
            alternatives? I'm always happy to share insights about my workflow
            and tool choices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/experience"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              View My Experience
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
