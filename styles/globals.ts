import { createGlobalStyle } from 'styled-components'
import tw from 'twin.macro'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Inter;
    src: local('Inter'),
         url('/fonts/inter/Inter-Regular.ttf') format('truetype');
    font-weight: 300;
  }

  @font-face {
    font-family: Inter;
    src: local('Inter'),
         url('/fonts/inter/Inter-ExtraBold.ttf') format('truetype');
    font-weight: 800;
  }

  :root {
    --nav-height: 60px;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
  }

  body {
    ${tw`bg-primary dark:bg-secondary text-secondary dark:text-primary`}
  }

  #__next {
    ${tw`h-full flex flex-col min-h-screen`}
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`
