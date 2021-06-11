import React, { useState } from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'

const NewPost = () => {
  const [value, setValue] = useState('**Hello world!!!**')
  const [selectedTab, setSelectedTab] = useState('write')

  const save = async function* (data) {
    // Promise that waits for "time" milliseconds
    const wait = function (time) {
      return new Promise((a, r) => {
        setTimeout(() => a(), time)
      })
    }

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000)
    // yields the URL that should be inserted in the markdown
    yield 'https://picsum.photos/300'
    await wait(2000)

    // returns true meaning that the save was successful
    return true
  }

  return (
    <ReactMde
      value={value}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(<ReactMarkdown children={markdown} />)
      }
      childProps={{ writeButton: { tabIndex: -1 } }}
      paste={{ saveImage: save }}
    />
  )
}

export default NewPost
