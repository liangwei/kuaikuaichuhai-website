'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
  }>
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, idx) => (
          <div
            key={idx}
            className="aspect-video rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            onClick={() => {
              setIndex(idx)
              setOpen(true)
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images}
        on={{
          view: ({ index: currentIndex }) => setIndex(currentIndex)
        }}
      />
    </>
  )
}
