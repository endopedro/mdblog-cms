import ReactPlayer from 'react-player/lazy'

const components = {
  p({ node, children }) {
    if (node.children[0].tagName === 'a') {
      const { href, title } = node.children[0].properties
      if (href.includes('youtube')) {
        return (
          <p className="relative" style={{ paddingTop: '56.25%' }}>
            <ReactPlayer
              style={{ top: 0, left: 0 }}
              className="mx-auto rounded overflow-hidden shadow absolute"
              url={href}
              controls
              width="100%"
              height="100%"
            />
          </p>
        )
      }
      return (
        <p>
          <a target="_blank" href={href}>
            {children}
          </a>
        </p>
      )
    }
    return <p>{children}</p>
  },
}

export default components
