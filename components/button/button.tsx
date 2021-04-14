import { ComponentPropsWithoutRef, FC } from 'react'
import tw, { styled } from 'twin.macro'

interface ButtonProps {
  as?: 'a' | 'button'
  size?: 'sm' | 'md' | 'lg'
  theme?: 'default' | 'instagram'
}

const sizes = {
  sm: tw`text-xs`,
  md: tw`text-base`,
  lg: tw`text-lg`,
}

const ButtonEl = styled.a<ButtonProps>`
  ${tw`
  rounded-lg
  m-auto
  px-4
  py-3
  cursor-pointer
  my-3
`}
  transition: all .2s ease-in-out;
  border: 4px solid rgba(255, 255, 255, 0.5);

  ${({ theme }) => {
    if (theme === 'instagram') {
      return `color: white;
      background-image: linear-gradient(
        45deg,
        rgb(240, 148, 51),
        rgb(230, 104, 60) 25%,
        rgb(220, 39, 67) 50%,
        rgb(204, 35, 102) 75%,
        rgb(188, 24, 136)
      );`
    }

    return tw`text-white bg-gradient-to-b from-btn-1 to-btn-2`
  }}

  ${({ size }) => sizes[size]}

  &:hover {
    ${tw`
    shadow-xl
    `}
    transform: translateY(-3px) scale(1.02);
  }

  &:disabled {
    border: 3px solid red;
  }
`

const Button: FC<ButtonProps & ComponentPropsWithoutRef<'button'>> = ({
  children,
  as = 'a',
  theme = 'default',
  // size = 'md',
  ...props
}) => {
  return (
    <ButtonEl as={as} theme={theme} {...props}>
      {children}
    </ButtonEl>
  )
}

export default Button
