import Link from 'next/link'
import { FC, SVGProps } from 'react'
import 'twin.macro'

const sizes = {
  default: 88,
  large: 150,
  small: 68,
}

const Logo: FC<SVGProps<SVGElement>> = ({ width = 'default' }) => {
  return (
    <Link href="/">
      <a>
        <svg viewBox="0 0 88 36" tw="cursor-pointer" width={sizes[width]}>
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="red">
                <animate
                  attributeName="stop-color"
                  values="red; blue; red"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              {/* <stop offset='50%' stopColor='magenta'>
                <animate
                  attributeName='stop-color'
                  values='magenta; blue; red'
                  dur='3s'
                  repeatCount='indefinite'
                />
              </stop> */}
              <stop offset="100%" stopColor="blue">
                <animate
                  attributeName="stop-color"
                  values="blue; red; blue"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <text
            fill="url(#gradient)"
            fontSize="30"
            x="0"
            fontWeight="700"
            textRendering="optimizeLegibility"
            letterSpacing="-2px"
            dominantBaseline="text-before-edge"
          >
            Manel.
          </text>
        </svg>
      </a>
    </Link>
  )
}

export default Logo
