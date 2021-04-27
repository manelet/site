import {
  FC,
  MouseEvent,
  useEffect,
  useState,
  useRef,
  createRef,
  MutableRefObject,
  useCallback,
} from 'react'
import tw, { styled } from 'twin.macro'
import Head from 'next/head'

import Block from '../../layout/block'
import { Beginnings, Career, Entrepreneurship } from '../../layout/about/sections'

const sections = {
  Beginnings,
  Career,
  Entrepreneurship,
}

const sectionNames = Object.keys(sections)

const sectionStyles = {
  Beginnings: tw`flex flex-col w-full`,
  Career: '',
  Entrepreneurship: tw`flex flex-col md:flex-row w-full items-center my-6`,
}

const Tab = styled.a`
  ${tw`
    relative
    rounded-full
    p-3
    cursor-pointer
    text-xs
    bg-transparent
    dark:bg-transparent
  `}

  transition: all .25s ease-in-out;

  &:not(:last-of-type) {
    ${tw`mr-3`}
  }
`

const TabWrapper = styled.div`
  ${tw`flex w-full sticky pb-3`}
  top: calc(var(--nav-height));
  margin-top: -0.75rem;
  z-index: 10;

  :before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    filter: blur(3px);
  }

  div {
    z-index: 20;
  }
`

const observerOptions = {
  threshold: 0.5,
  trackVisibility: true,
  delay: 100,
}

const About: FC = () => {
  const sectionRefs = useRef([])
  const [active, setActive] = useState(`#${sectionNames[0].toLowerCase()}`)
  const goToSection = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    const $href = document.querySelector(href) as HTMLElement

    if ($href !== null) {
      setActive(href)
      scroll({
        top: $href.offsetTop - 35,
        behavior: 'smooth',
      })
    }
  }

  sectionNames.forEach((_, i) => (sectionRefs.current[i] = createRef()))

  const observerCallback = useCallback((entries: Array<IntersectionObserverEntry>): void => {
    const candidateSections: Array<IntersectionObserverEntry> = []

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        candidateSections.push(entry)
      }
    })

    if (candidateSections.length) {
      setActive(`#${candidateSections.pop().target.id}`)
    }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(observerCallback, observerOptions)

    sectionRefs.current.forEach((el: MutableRefObject<HTMLElement>): void => io.observe(el.current))
  }, [observerCallback])

  return (
    <>
      <Head>
        <title>About - Manel Escuer</title>
        <meta
          name="description"
          content="A brief history of my beginnings from developing hobby web pages with Frontpage 95 to owning an ecommerce with 22yo"
        />
      </Head>
      <Block>
        <TabWrapper>
          {sectionNames.map((section) => {
            const id = `#${section.toLowerCase()}`
            return (
              <Tab
                key={`tab-${section.toLowerCase()}`}
                href={id}
                onClick={goToSection}
                css={[id === active && tw`bg-gray-100 dark:bg-gray-800`]}
              >
                {section}
              </Tab>
            )
          })}
        </TabWrapper>

        <div>
          {sectionNames.map((section, i) => {
            const id = section.toLowerCase()
            const Section = sections[section]

            return (
              <div ref={sectionRefs.current[i]} id={id} key={id} css={[sectionStyles[section]]}>
                <Section />
              </div>
            )
          })}
        </div>
      </Block>
    </>
  )
}

export default About
