import { useLayout } from '../state'
import { useSpring, animated } from 'react-spring'
import { FC, SVGProps } from 'react'

const animation = {
  dark: {
    r: 9,
    transform: 'rotate(40deg)',
    cx: 12,
    cy: 4,
    opacity: 0,
  },
  light: {
    r: 5,
    transform: 'rotate(90deg)',
    cx: 30,
    cy: 0,
    opacity: 1,
  },
  springConfig: { mass: 4, tension: 250, friction: 35 },
}

const ThemeToggler: FC<SVGProps<SVGElement>> = ({ width = 24, height = 24 }) => {
  const {
    state: { theme },
    actions: { updateTheme },
  } = useLayout()
  const isDark = theme === 'dark'
  const fill = isDark ? 'white' : 'black'
  const { r, transform, cx, cy, opacity } = animation[isDark ? 'dark' : 'light']
  const svgContainerProps = useSpring({ transform, config: animation.springConfig })
  const centerCircleProps: any = useSpring({ r, config: animation.springConfig }) // eslint-disable-line
  const maskedCircleProps: any = useSpring({ cx, cy, config: animation.springConfig }) // eslint-disable-line
  const linesProps = useSpring({ opacity, config: animation.springConfig })

  return (
    <animated.svg
      onClick={() => updateTheme(isDark ? 'light' : 'dark')}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: 'rotate(40deg)', ...svgContainerProps }}
    >
      <mask id="mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle style={{ ...maskedCircleProps }} r="9" fill="black" />
      </mask>
      <animated.circle cx="12" cy="12" style={centerCircleProps} fill={fill} mask="url(#mask)" />
      <animated.g stroke="currentColor" style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </animated.g>
    </animated.svg>
  )
}

export default ThemeToggler
