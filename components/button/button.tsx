import { ComponentPropsWithoutRef, forwardRef } from 'react'
import tw, { styled } from 'twin.macro'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  as?: 'a' | 'button'
  size?: 'sm' | 'md' | 'lg'
  theme?: 'default' | 'instagram'
}

const sizes = {
  sm: tw`text-xs`,
  md: tw`text-base`,
  lg: tw`text-lg`,
}

const ButtonEl = styled.a`
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

  ${({ size }: ButtonProps) => sizes[size]}

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

// TODO: Fix this annoying any
const Button = forwardRef<any, any>((props, ref) => (
  <ButtonEl {...props} ref={ref}>
    {props.children}
  </ButtonEl>
))

Button.displayName = 'Button'

export default Button
