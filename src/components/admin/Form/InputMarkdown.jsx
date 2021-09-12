import React, { useState, useRef } from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import { useFormContext } from 'react-hook-form'
import { RiImageAddLine } from 'react-icons/ri'

import GalleryModal from '../GalleryModal'
import mdComponents from '../../../utils/mdComponents'

const InputMarkdown = ({ name, className, ...rest }) => {
  const methods = useFormContext()
  const [selectedTab, setSelectedTab] = useState('write')
  const [opened, setOpened] = useState(false)
  const optsRef = useRef()

  methods.register(name)
  const fieldWatch = methods.watch(name)

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

  const addImageFromGallery = {
    name: 'add-from-gallery',
    icon: () => <RiImageAddLine className="mt-1" />,
    execute: (opts) => {
      if (!optsRef.current) optsRef.current = opts
      // opts.textApi.replaceSelection('NICE')
      setOpened(true)
    },
  }

  // const components = {
  //   h1(h1) {
  //     console.log(h1)
  //     return <h1 className="h1">{h1.children}</h1>
  //   },
  // }

  const onSelect = (image) => {
    optsRef.current.textApi.replaceSelection(`![](${image.secure_url})`)
    setOpened(false)
  }

  return (
    <div className={className}>
      <ReactMde
        commands={{ 'add-image': addImageFromGallery }}
        toolbarCommands={[
          ['header', 'bold', 'italic', 'strikethrough'],
          ['link', 'quote', 'code', 'image', 'add-image'],
          ['unordered-list', 'ordered-list', 'checked-list'],
        ]}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(
            <ReactMarkdown components={mdComponents} children={markdown} />
          )
        }
        childProps={{ writeButton: { tabIndex: -1 } }}
        // paste={{ saveImage: save }}
        value={fieldWatch}
        onChange={(val) => methods.setValue(name, val)}
        {...rest}
      />
      <GalleryModal opened={opened} setOpened={setOpened} onSelect={onSelect} />
    </div>
  )
}

export default InputMarkdown
