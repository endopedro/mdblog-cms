import React from 'react'
import Head from 'next/head'
import { useMantineTheme } from '@mantine/core'
import Navbar from '../../components/blog/Navbar'

const BlogLayout = ({ children, page, blogName }) => {
  const theme = useMantineTheme()

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #0a0a0b;
          color: #d6dade;
          margin: 0;
        }

        *::-webkit-scrollbar {
          width: 12px;
        }

        *::-webkit-scrollbar-track {
          background: ${theme.colors['dark'][4]};
        }

        *::-webkit-scrollbar-thumb {
          background-color: ${theme.colors['dark'][7]};
          border-radius: 20px;
          border: 3px solid ${theme.colors['dark'][4]};
        }

        *::-webkit-resizer {
          border: 9px solid ${theme.colors['dark'][8]};
          border-bottom-color: ${theme.colors['dark'][4]};
          border-right-color: ${theme.colors['dark'][4]};
        }
      `}</style>
      <Head>
        <title>{blogName}</title>
      </Head>
      <main>
        <Navbar page={page} blogName={blogName} />
        <div className="container mx-auto px-2 lg:px-8 max-w-4xl">
          {children}
        </div>
      </main>
    </>
  )
}

export default BlogLayout
