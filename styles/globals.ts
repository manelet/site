import { createGlobalStyle } from 'styled-components'
import tw from 'twin.macro'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Inter;
    src: local('Inter'),
         url('/fonts/inter/Inter-Regular.ttf') format('truetype');
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: Inter;
    src: local('Inter'),
         url('/fonts/inter/Inter-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-display: swap;
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
    ${tw`bg-white dark:bg-black text-gray-900 dark:text-white`}
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

  ::selection {
    ${tw`bg-pink-500 text-white`}
  }
`
