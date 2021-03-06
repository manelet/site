import { FC, ReactNode } from 'react'
import tw, { styled } from 'twin.macro'

const MenuIconsWrapper = styled.div`
  ${tw`mt-10 ml-0 md:mt-0 md:ml-10 flex justify-center md:justify-start items-center`}

  svg, a {
    ${tw`flex cursor-pointer`}
  }

  svg:not(:last-child),
  a:not(:last-child) {
    ${tw`mr-8 md:mr-4`}
  }
`

const MenuIcons: FC<{ children: ReactNode }> = ({ children }) => {
  return <MenuIconsWrapper>{children}</MenuIconsWrapper>
}

export default MenuIcons
