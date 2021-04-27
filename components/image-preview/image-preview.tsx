import emojiStrip from 'emoji-strip'
import { FC } from 'react'
import { Article } from '../../@types/articles'
import { formattedDate } from '../../lib/utils'

const MAX = 20

function parseTitle(title: string): string | Array<string> {
  if (title.length < MAX) {
    return title.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
  }

  const words = title.split(' ')
  const { lines } = words.reduce(
    (acc, word) => {
      word = emojiStrip(word)

      if (word && word.length) {
        if (acc.count + word.length <= MAX) {
          acc.count += word.length
          acc.lines[acc.lines.length - 1].push(word)
        } else {
          acc.count = word.length
          acc.lines.push([word])
        }
      }
      return acc
    },
    { count: 0, lines: [[]] }
  )

  return lines.map((line) => line.join(' '))
}

const MAX_WIDTH = 350
const MAX_HEIGHT = 1000

function getSize(width, height) {
  const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
  return { width: width * ratio, height: height * ratio }
}

const ImagePreview: FC<Partial<Article>> = ({ data }) => {
  const { image, date, title } = data
  const parsedTitle = parseTitle(title)
  const { width, height } = getSize(image.width, image.height)

  return (
    <svg viewBox="0 0 600 315" width="600" height="315">
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#70e1f5', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ffd194', stopOpacity: 1 }} />
      </linearGradient>

      <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />

      <text x="31" y="101" fill="white" fontSize="16" textRendering="optimizeLegibility">
        {formattedDate(date)}
      </text>

      <text
        y="130"
        fill="white"
        fontSize="32"
        fontWeight="bold"
        fontFamily="Arial"
        textRendering="optimizeLegibility"
        textAnchor="start"
      >
        {Array.isArray(parsedTitle)
          ? parsedTitle.map((line, i) => (
              <tspan fontFamily="Arial" x="31" dy="3rem" key={`line-${i}`}>
                {line}
              </tspan>
            ))
          : title}
      </text>

      {image && (
        <image
          href={process.env.BASE_URL + image.src}
          x="300"
          y={image.src.includes('manelet') ? '-40' : '0'}
          width={width}
          height={height}
        />
      )}

      <g transform="translate(31, 270, 0)">
        <g transform="translate(0, 0, 0) scale(.8)">
          <path
            fill="white"
            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
          />
        </g>
        <g transform="translate(30, 0, 0) scale(.8)">
          <path
            fill="white"
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          />
        </g>
        <text
          y="13"
          x="60"
          fontSize="14px"
          fontWeight="300"
          fill="white"
          textRendering="optimizeLegibility"
        >
          @manelet
        </text>
      </g>
    </svg>
  )
}

export default ImagePreview
