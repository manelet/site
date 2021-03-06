import tw, { styled } from 'twin.macro'
import { useSpring, animated } from 'react-spring'
import { useLayout } from '../state'
import { FC } from 'react'

const BurgerWrapper = styled.div`
  ${tw`
  flex
  items-center
  md:hidden
  z-10
  md:z-0
  cursor-pointer
  `}

  svg path {
    stroke: black;
    stroke-linejoin: round;
    stroke-width: 2px;
  }
`

const DELAY = 450

const MenuToggler: FC = () => {
  const {
    state: { showMobileMenu },
    actions: { toggleMobileMenu },
  } = useLayout()

  const line1: any = {
    d: useSpring({
      from: { value: 'M 4 3 H 24 Z' },
      value: showMobileMenu ? 'M 4 12 H 24 Z' : 'M 4 3 H 24 Z',
      delay: !showMobileMenu ? DELAY : 0,
    }),
    transform: useSpring({
      from: { value: 'rotate(0deg) translateX(0px)' },
      value: `rotate(${showMobileMenu ? -45 : 0}deg) translateX(${showMobileMenu ? 2 : 0}px)`,
      delay: showMobileMenu ? DELAY : 0,
    }),
  }

  const line2 = useSpring({
    from: { opacity: 1 },
    opacity: showMobileMenu ? 0 : 1,
  })

  const line3: any = {
    d: useSpring({
      from: { value: 'M 4 21 H 24 Z' },
      value: showMobileMenu ? 'M 4 12 H 24 Z' : 'M 4 21 H 24 Z',
      delay: !showMobileMenu ? DELAY : 0,
    }),
    transform: useSpring({
      from: { value: 'rotate(0deg) translateX(0px)' },
      value: `rotate(${showMobileMenu ? 45 : 0}deg) translateX(${showMobileMenu ? -2 : 0}px)`,
      delay: showMobileMenu ? DELAY : 0,
    }),
  }

  return (
    <BurgerWrapper onClick={toggleMobileMenu}>
      <svg fill="none" height="28" viewBox="0 0 28 28" width="28">
        <animated.path
          d={line1.d.value}
          style={{ transform: line1.transform.value, transformOrigin: '50% 50%' }}
        />
        <animated.path d="M 4 12 H 18 Z" style={{ opacity: line2.opacity }} />
        <animated.path
          d={line3.d.value}
          style={{ transform: line3.transform.value, transformOrigin: '50% 50%' }}
        />
      </svg>
    </BurgerWrapper>
  )
}

export default MenuToggler
