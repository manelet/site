import tw, { styled } from 'twin.macro'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { animated, useSpring } from 'react-spring'
import { FC, useEffect, useState, useRef } from 'react'
import { useWindowWidth } from '@react-hook/window-size'

import { IconTwitter } from '../components/icons/twitter'
import { IconGithub } from '../components/icons/github'
import ThemeToggler from './menu-icons/theme-toggler'
import MenuToggler from './menu-icons/menu-toggler'
import { useLayout } from './state'
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from '../components/dropdown/dropdown'
import { Category } from '../@types/category'
import { capitalize } from '../lib/utils'

const DDToggle = styled(DropdownToggle)`
  @media screen and (min-width: 768px) {
    margin-right: 2.5rem;
  }
`

const DDMenu = styled(DropdownMenu)`
  width: auto;
  @media screen and (min-width: 768px) {
    width: 200px;
  }
`

const Menu: FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()
  const width = useWindowWidth()
  const {
    state: { showMobileMenu },
    actions: { toggleMobileMenu },
  } = useLayout()
  const ref = useRef(null)
  const canAnimate = !!(width && width <= 768)
  const iconSize = canAnimate ? 24 : 18
  const styles = useSpring({
    opacity: showMobileMenu ? 1 : 0,
    config: { duration: 350 },
    onStart(): void {
      if (ref.current && showMobileMenu && canAnimate) {
        ref.current.style.visibility = 'visible'
      }
    },
    onRest({ opacity }) {
      if (!opacity && canAnimate) {
        ref.current.style.visibility = 'hidden'
      }
    },
  })

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then(setCategories)
  }, [])

  useEffect(() => {
    ref.current.style.visibility = width < 768 ? 'hidden' : 'visible'
  }, [width])

  useEffect(() => {
    const handleRouteChange = (): void => {
      if (showMobileMenu) {
        toggleMobileMenu()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [showMobileMenu, toggleMobileMenu, router.events])

  return (
    <>
      <Nav style={canAnimate ? styles : {}} ref={ref}>
        <div tw="md:not-last-of-type:mr-10">
          <Dropdown>
            <DDToggle>
              <Link href="/articles">
                <MenuLink>Articles</MenuLink>
              </Link>
            </DDToggle>
            <DDMenu>
              {categories.length &&
                categories.map(({ name, slug }) => (
                  <DropdownItem key={slug}>
                    <Link href={`/category/${slug}`}>
                      <a>{capitalize(name)}</a>
                    </Link>
                  </DropdownItem>
                ))}
            </DDMenu>
          </Dropdown>
        </div>
        <Link href="/projects">
          <MenuLink>Projects</MenuLink>
        </Link>
        <Link href="/about">
          <MenuLink>About</MenuLink>
        </Link>
        <Link href="/contact">
          <MenuLink>Drop a line</MenuLink>
        </Link>

        <MenuIcons>
          <ThemeToggler width={iconSize} height={iconSize} />
          <a href="https://twitter.com/manelescuer" target="_blank" rel="noreferrer">
            <IconTwitter width={iconSize} height={iconSize} />
          </a>
          <a href="https://github.com/manelet" target="_blank" rel="noreferrer">
            <IconGithub width={iconSize} height={iconSize} />
          </a>
        </MenuIcons>
      </Nav>
      <MenuToggler />
    </>
  )
}

const MenuIcons = dynamic(() => import('./menu-icons/menu-icons'), { ssr: false })
// const ThemeToggler = dynamic(() => import('./theme-toggler'), { ssr: false })

const MenuLink = tw.a`
  cursor-pointer
  text-3xl
  font-extrabold
  md:text-base
  md:font-normal
  mr-0
  md:not-last-of-type:mr-10
`

const Nav = styled(animated.nav)`
  ${tw`
  z-0
  bg-white
  invisible
  flex
  flex-col
  justify-center
  items-center
  absolute
  top-0
  left-0
  right-0
  bottom-0
  w-screen
  h-screen
  opacity-0

  md:bg-transparent
  md:relative
  md:visible
  md:flex-row
  md:justify-end
  md:w-auto
  md:h-auto
  md:opacity-100
`}
`

export default Menu
