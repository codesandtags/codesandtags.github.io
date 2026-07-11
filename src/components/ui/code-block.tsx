import * as React from "react"
import { codeToHtml } from "shiki"
import { CopyButton } from "./copy-button"

export async function CodeBlock({ children }: React.HTMLAttributes<HTMLPreElement>) {
  let language = "text"
  let rawCode = ""

  if (React.isValidElement(children)) {
    const childProps = children.props as React.HTMLAttributes<HTMLElement>
    if (childProps?.className) {
      const match = /language-(\w+)/.exec(childProps.className || "")
      language = match ? match[1] : "text"
    }
    rawCode = (childProps?.children as string) || ""
  } else if (typeof children === "string") {
    rawCode = children
  }

  // Clean up trailing newlines
  rawCode = rawCode.trimEnd()

  let html = ""
  try {
    html = await codeToHtml(rawCode, {
      lang: language,
      theme: "github-dark",
    })
  } catch {
    html = `<pre><code>${rawCode}</code></pre>`
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-zinc-800 bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <div className="text-xs font-medium lowercase text-zinc-400">
          {language}
        </div>
        <CopyButton text={rawCode} />
      </div>
      <div
        className="overflow-x-auto p-4 text-sm [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
