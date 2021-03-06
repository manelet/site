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
import Block from '../../layout/block'
import { Beginnings, Career, Entrepreneurship } from './sections'

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

interface TabProps {
  active?: boolean
}

const Tab = styled.a`
  ${tw`
    relative
    rounded-full
    p-3
    cursor-pointer
    text-xs
  `}
  transition: all .25s ease-in-out;

  ${({ active }: TabProps) => active && tw`bg-gray-100 shadow-inner`}

  &:hover {
    ${tw`bg-gray-100 shadow-inner`}
  }

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
  threshold: 0.1,
}

const About: FC = () => {
  const sectionRefs = useRef([])
  const [active, setActive] = useState(`#${sectionNames[0].toLowerCase()}`)
  const isActive = (section: string): boolean => section === active
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

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]): void => {
    const BreakException = {}

    try {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.intersectionRatio === 1) {
          setActive(`#${entry.target.id}`)
          throw BreakException
        }

        if (entry.intersectionRatio > 0.1) {
          if (entry.isIntersecting) {
            return setActive(`#${entry.target.id}`)
          }
        }

        if (!entry.isIntersecting) {
          const index = sectionNames.findIndex((s) => s.toLowerCase() === entry.target.id)

          if (sectionNames[index - 1]) {
            return setActive(`#${sectionNames[index - 1].toLowerCase()}`)
          }
        }
      })
    } catch (e) {
      if (e !== BreakException) {
        throw e
      }
    }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(observerCallback, observerOptions)

    sectionRefs.current.forEach((el: MutableRefObject<HTMLElement>): void => io.observe(el.current))
  }, [observerCallback])

  return (
    <Block>
      <TabWrapper>
        {sectionNames.map((section) => {
          const id = `#${section.toLowerCase()}`
          return (
            <Tab key={`tab-${id}`} href={id} active={isActive(id)} onClick={goToSection}>
              {section}
            </Tab>
          )
        })}
      </TabWrapper>

      {sectionNames.map((section, i) => {
        const id = section.toLowerCase()
        const Section = sections[section]

        return (
          <div ref={sectionRefs.current[i]} id={id} key={id} css={[sectionStyles[section]]}>
            <Section />
          </div>
        )
      })}
    </Block>
  )
}

export default About
