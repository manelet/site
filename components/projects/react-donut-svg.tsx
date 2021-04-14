import { FC } from 'react'
import Donut from 'react-donut-svg'
import tw, { styled } from 'twin.macro'
import { Feature } from '../feature'
import { FeatureWindow } from '../feature-window'
import { Code } from '../mdx/code'

export const ReactDonutSvg: FC = () => {
  return (
    <>
      <Feature>
        {[
          <div tw="grid grid-cols-2 gap-4" key="react-donut-svg-content-1">
            <div tw="p-2">
              <Donut delay={1000} value={75} label="A" color="fuchsia" />
            </div>
            <div tw="p-2">
              <Donut delay={1250} value={100} label="B" />
            </div>
            <div tw="p-2">
              <Donut delay={1500} value={25} label="C" color="lime" />
            </div>
            <div tw="p-2">
              <Donut delay={1750} value={33} label="D" color="fuchsia" />
            </div>
          </div>,
          <>
            <h2>Light donuts, just 1.7kb</h2>
            <p>
              Do you need to show some key indicators in a form of donut chart? I&apos;ve got your
              back covered!{' '}
              <span role="img" aria-label="strong">
                💪
              </span>
            </p>
            <p>Enjoy easy-to-use, responsive, SVG animated donut charts with just 2 steps.</p>
          </>,
        ]}
      </Feature>

      <div tw="my-10">
        <h2 tw="mb-10">Install</h2>
        <Code>npm install -S react-donut-svg</Code>
      </div>

      <div tw="my-10">
        <h2 tw="mb-10">Usage</h2>
        <Code>
          {`import Donut from 'react-donut-svg'

function Chart () {
  return (
    <Donut value={50} label='name' />
  )
}`}
        </Code>
      </div>

      <div>
        <h2>Props</h2>

        <FeatureWindow>
          <PropsList>
            <li>
              <div tw="font-bold text-lg">label</div>
              <div>
                <pre>boolean</pre> Whether or not to use color gradient. Defaults to false
              </div>
            </li>
            <li>
              <div tw="font-bold text-lg">color</div>
              <pre>string</pre>
              <div>Fill color of the donut. Defaults to rgba(151, 239, 233, 1)</div>
            </li>
            <li>
              <div tw="font-bold text-lg">withGradient</div>
              <pre>boolean</pre>
              <div>Whether or not to use color gradient. Defaults to false</div>
            </li>
            <li>
              <div tw="font-bold text-lg">delay</div>
              <pre>int</pre>
              <div>Delay in miliseconds. Defaults to 0</div>
            </li>
            <li>
              <div tw="font-bold text-lg">showLabel</div>
              <pre>boolean</pre>
              <div>Whether or not to show the label. Defaults to true</div>
            </li>
          </PropsList>
        </FeatureWindow>
      </div>
    </>
  )
}

const PropsList = styled.ul`
  ${tw`p-0 list-none`}

  li:not(:last-child) {
    ${tw`mb-10`}
  }
`
