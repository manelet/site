import tw from 'twin.macro'
import styled from 'styled-components'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
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

const Menu: FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()
  const width = useWindowWidth()
  const {
    state: { showMobileMenu, theme },
    actions: { toggleMobileMenu },
  } = useLayout()
  const fill = theme === 'dark' ? 'white' : 'black'
  // const ref = useRef(null)
  const isMobile = width && width <= 768
  const iconSize = isMobile ? 24 : 18
  // const styles = useSpring({
  //   opacity: showMobileMenu ? 1 : 0,
  //   config: { duration: 350 },
  //   onStart(): void {
  //     if (ref.current && showMobileMenu && isMobile) {
  //       ref.current.style.visibility = 'visible'
  //     }
  //   },
  //   onRest({ opacity }) {
  //     if (!opacity && isMobile) {
  //       ref.current.style.visibility = 'hidden'
  //     }
  //   },
  // })

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then(setCategories)
  }, [])

  // useEffect(() => {
  //   ref.current.style.visibility = width < 768 ? 'hidden' : 'visible'
  // }, [width])

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
      <Nav css={[isMobile && showMobileMenu && tw`visible opacity-100`]}>
        <div tw="md:not-last-of-type:mr-10">
          <Dropdown>
            <DropdownToggle>
              <Link href="/articles">
                <MenuLink>Articles</MenuLink>
              </Link>
            </DropdownToggle>
            <DropdownMenu css={[`width: 200px;`]}>
              {categories?.map(({ name, slug }) => (
                <DropdownItem key={slug}>
                  <Link href={`/category/${slug}`}>
                    <a>{capitalize(name)}</a>
                  </Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Link href="/projects">
          <MenuLink>Projects</MenuLink>
        </Link>
        <Link href="/about">
          <MenuLink>About</MenuLink>
        </Link>
        <Link href="/contact">
          <MenuLink>Contact</MenuLink>
        </Link>

        <MenuIcons>
          <ThemeToggler width={iconSize} height={iconSize} />
          <a
            title="twitter profile"
            href="https://twitter.com/manelescuer"
            target="_blank"
            rel="noreferrer"
          >
            <IconTwitter width={iconSize} height={iconSize} fill={fill} />
          </a>
          <a
            title="github profile"
            href="https://github.com/manelet"
            target="_blank"
            rel="noreferrer"
          >
            <IconGithub width={iconSize} height={iconSize} fill={fill} />
          </a>
        </MenuIcons>
      </Nav>
      <MenuToggler />
    </>
  )
}

const MenuIcons = dynamic(() => import('./menu-icons/menu-icons'), { ssr: false })
// const ThemeToggler = dynamic(() => import('./theme-toggler'), { ssr: false })

const MenuLink = styled.a`
  ${tw`
  cursor-pointer
  text-3xl
  text-black
  dark:text-white
  font-extrabold
  md:text-base
  md:font-normal
  mr-0
  md:not-last-of-type:mr-10
  `}

  :hover {
    background: -webkit-linear-gradient(red, blue);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const Nav = styled.nav`
  ${tw`
  z-0
  bg-white
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
  invisible
  opacity-0
  duration-300
  transition

  md:visible
  md:opacity-100
  md:bg-transparent
  md:relative
  md:flex-row
  md:justify-end
  md:w-auto
  md:h-auto
`}
`

export default Menu
