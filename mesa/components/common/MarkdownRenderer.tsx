/* eslint-disable @typescript-eslint/no-unused-vars */
// components/MarkdownRenderer.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="my-3 leading-relaxed" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 my-3" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 my-3" {...props} />
        ),
        li: ({ node, ...props }) => <li className="my-1" {...props} />,
        a: ({ node, ...props }) => (
          <a
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto">
            <table className="min-w-full border my-4" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="border px-4 py-2 text-left bg-gray-50" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border px-4 py-2" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
