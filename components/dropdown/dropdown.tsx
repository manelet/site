import { Children, cloneElement, FC, isValidElement, RefObject, useRef, useState } from 'react'
import tw, { css, styled } from 'twin.macro'
import { useWindowWidth } from '@react-hook/window-size'
import { FlattenSimpleInterpolation } from 'styled-components'

interface DropdownState {
  ctx?: {
    isOpen: boolean
    toggleOpen: (isOpen: boolean) => void
    refs: Record<string, RefObject<HTMLDivElement>>
  }
  css?: FlattenSimpleInterpolation
  className?: string
}

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    position: relative;
  }
`

const Toggle = styled.div`
  ${tw`flex items-center`}
`

const Caret = styled.svg`
  ${tw`hidden`}
  width: 12px;
  height: 12px;
  transform-origin: 50% 50%;
  transition: all 0.3s ease-in-out;

  ${({ isOpen }: { isOpen: boolean }) =>
    isOpen ? `transform: rotate(180deg);` : `transform: rotate(0deg);`}

  @media screen and (min-width: 768px) {
    ${tw`block ml-2`}
  }

  path {
    ${tw`fill-current text-black dark:text-white`}
  }
`

const menuStyles = css`
  display: block;

  ul {
    list-style-type: none;
    padding-left: 0;

    li {
      padding: 0;
      ${tw`text-center`}
    }
  }

  @media screen and (min-width: 768px) {
    position: absolute;
    z-index: 9999 !important;

    li {
      ${tw`flex flex-shrink-0 w-full mx-0 my-2 text-base pl-0`}
    }

    ul {
      ${tw`relative bg-white rounded-md flex-col m-0 p-4 shadow-2xl mt-5 border border-gray-100`}
      margin-top: 1em;

      :before {
        position: absolute;
        content: '';
        width: 0px;
        height: 0px;
        top: -4px;
        left: 10px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid white;
      }
    }
  }
`

const menuVisibility = (isOpen): FlattenSimpleInterpolation => css`
  @media screen and (min-width: 768px) {
    ${isOpen ? tw`block` : tw`hidden`}
  }
`

const Item = styled.li`
  ${tw`
  text-lg
  pl-3
`}
  a {
    ${tw`text-black dark:text-black`}
  }
`

const Dropdown: FC = ({ children }) => {
  const [isOpen, toggleOpen] = useState(false)
  const width = useWindowWidth()
  const refs = {
    wrapper: useRef(),
    toggle: useRef(),
    menu: useRef(),
  }
  const isTablet = width <= 768
  const ctx = { isTablet, refs, isOpen, toggleOpen }
  const onMouseLeave = (): void => toggleOpen(false)

  return (
    <Wrapper ref={refs.wrapper} onMouseLeave={onMouseLeave}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { ...child.props, ctx })
        }
      })}
    </Wrapper>
  )
}

Dropdown.displayName = 'Dropdown'

const DropdownToggle: FC<DropdownState> = ({
  children,
  ctx: { refs, toggleOpen, isOpen } = {},
  ...props
}) => {
  const onMouseOver = (): void => toggleOpen(true)

  return (
    <Toggle ref={refs.toggle} onMouseOver={onMouseOver} {...props}>
      {children}
      <Caret viewBox="0 0 24 24" onClick={() => toggleOpen(!isOpen)} isOpen={isOpen}>
        <path
          clipRule="evenodd"
          d="M12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071Z"
          fillRule="evenodd"
        />
      </Caret>
    </Toggle>
  )
}

DropdownToggle.displayName = 'DropdownToggle'

const DropdownMenu: FC<DropdownState> = ({ children, ctx: { refs, isOpen }, className }) => {
  const customStyles = [menuStyles, menuVisibility(isOpen)]

  return (
    <div ref={refs.menu} className={className} css={[customStyles]}>
      <ul tw="w-full">{children}</ul>
    </div>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

const DropdownItem: FC = ({ children }) => <Item>{children}</Item>

DropdownItem.displayName = 'DropdownItem'

export default Dropdown
export { DropdownItem, DropdownToggle, DropdownMenu }
