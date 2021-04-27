import { FC, RefObject } from 'react'
import tw, { styled } from 'twin.macro'
import { FlattenSimpleInterpolation } from 'styled-components'
import { Provider, useDropdown } from './ctx'

interface DropdownState {
  ctx?: {
    isOpen: boolean
    toggleOpen: (isOpen: boolean) => void
    refs: Record<string, RefObject<HTMLDivElement>>
    openMenu: () => void
    closeMenu: () => void
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
  ${tw`flex items-center justify-center`}
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

const Menu = styled.div`
  ${tw`block md:absolute md:z-50 md:transition-all md:duration-500 md:scale-0`}
`

const MenuList = styled.ul`
  ${tw`
  w-full
  list-none
  pl-0
  md:relative
  md:bg-white
  md:rounded-md
  md:flex-col
  md:m-0
  md:p-4
  md:shadow-2xl
  md:mt-5
  md:border
  md:border-gray-100
  md:mt-4`}

  &:before {
    ${tw`absolute w-0 h-0`}
    content: '';
    top: -4px;
    left: 10px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
  }
`

const Item = styled.li`
  ${tw`
  text-lg
  pl-3
  p-0
  text-center

  md:flex
  md:flex-shrink-0
  md:w-full
  md:mx-0
  md:my-2
  md:text-base
  md:pl-0`}

  a {
    ${tw`text-black dark:text-black`}
  }
`

const Dropdown: FC = ({ children }) => {
  const { closeMenu } = useDropdown()
  return (
    <Wrapper className="dd" onMouseLeave={closeMenu}>
      {children}
    </Wrapper>
  )
}

Dropdown.displayName = 'Dropdown'

const DropdownWithProvider: FC = ({ children }) => {
  return (
    <Provider>
      <Dropdown>{children}</Dropdown>
    </Provider>
  )
}

Dropdown.displayName = 'DropdownWithProvider'

const DropdownToggle: FC<DropdownState> = ({ children, ...props }) => {
  const { toggleMenu, isOpen, openMenu } = useDropdown()

  return (
    <div tw="flex items-center cursor-pointer" onMouseOver={openMenu} onFocus={() => void 0}>
      <Toggle className="dd-toggle" {...props}>
        {children}
      </Toggle>
      <Caret viewBox="0 0 24 24" onClick={toggleMenu} isOpen={isOpen}>
        <path
          clipRule="evenodd"
          d="M12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071Z"
          fillRule="evenodd"
        />
      </Caret>
    </div>
  )
}

DropdownToggle.displayName = 'DropdownToggle'

const DropdownMenu: FC<DropdownState> = ({ children, ...props }) => {
  const { isOpen } = useDropdown()

  return (
    <Menu css={[isOpen ? tw`md:block` : tw`md:hidden`]} {...props}>
      <MenuList tw="w-full">{children}</MenuList>
    </Menu>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

const DropdownItem: FC = ({ children }) => <Item>{children}</Item>

DropdownItem.displayName = 'DropdownItem'

export default DropdownWithProvider
export { DropdownItem, DropdownToggle, DropdownMenu }
