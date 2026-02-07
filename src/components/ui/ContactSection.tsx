import React from 'react'
import { Mail, Calendar } from 'lucide-react'

export default function ContactSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects.
            Whether you&apos;re looking for a developer to join your team or need
            help with a specific project, I&apos;d love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Calendly Booking */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Book a Meeting</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Schedule a call to discuss your project, collaboration
                opportunities, or just to chat about technology
              </p>
              <a
                href="https://calendly.com/codesandtags"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Calendar className="h-4 w-4" />
                Schedule Meeting
              </a>
            </div>

            {/* Email Contact */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Me</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                For project inquiries, collaborations, or just to say hello
              </p>
              <a
                href="mailto:codesandtags@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
