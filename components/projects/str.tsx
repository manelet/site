import { FC } from 'react'
import 'twin.macro'
import { Feature } from '../feature'
import { FeatureWindow } from '../feature-window'
import { Code } from '../mdx/code'

export const Str: FC = () => {
  return (
    <>
      <Feature>
        {[
          <Code key="str-content-block-0" className="javascript">
            {`npm i -S str

const slugify = require('str/slugify')

import slugify from 'str/slugify'

slugify('mAnElEt') // manelet`}
          </Code>,
          <>
            <h2>Your swiss knife for strings</h2>
            <p>
              🛠 A complete set of functions for string manipulation that will cover your needs both
              in back and frontend.
            </p>
            <p>
              <span role="img" aria-label="fast">
                ⚡️
              </span>{' '}
              Lightweight, just <b>483 bytes</b>
            </p>
            <p>
              <span role="img" aria-label="victory">
                ✌️
              </span>{' '}
              Both <i>CJS</i> & <i>ESM</i> compatible.
            </p>
          </>,
        ]}
      </Feature>

      <FeatureWindow>
        <h2>Methods</h2>

        <ul tw="list-none p-0">
          <li tw="mb-12">
            <div tw="font-bold text-lg">slugify</div>
            <Code className="javascript no-margin">
              slugify(&quot;I&apos;m Manel&quot;, delimeter = &apos;-&apos;) // im-manel
            </Code>
          </li>
          <li tw="mb-12">
            <div tw="font-bold text-lg">camelcase</div>
            <Code className="javascript no-margin">
              camelcase(&quot;I&apos;m Manel&quot;) // imManel
            </Code>
          </li>
          <li tw="mb-12">
            <div tw="font-bold text-lg">startsWidth</div>
            <Code className="javascript no-margin">
              startsWidth(&quot;I&apos;m Manel&quot;, &quot;I&quot;) // true
            </Code>
          </li>
          <li tw="mb-12">
            <div tw="font-bold text-lg">endsWith</div>
            <Code className="javascript no-margin">
              endsWith(&quot;I&apos;m Manel&quot;, &quot;el&quot;) // true
            </Code>
          </li>
          <li tw="mb-12">
            <div tw="font-bold text-lg">upper</div>
            <Code className="javascript no-margin">
              upper(&quot;I&apos;m Manel&quot;) // I&apos;M MANEL
            </Code>
          </li>
          <li tw="mb-12">
            <div tw="font-bold text-lg">lower</div>
            <Code className="javascript no-margin">
              lower(&quot;I&apos;m Manel&quot;) // i&apos;m manel
            </Code>
          </li>
          <li>
            And many more!{' '}
            <a
              href="https://github.com/manelet/str/pulls"
              target="_BLANK"
              rel="noopener noreferrer"
            >
              Feel free to add yours
            </a>{' '}
            😚
          </li>
        </ul>
      </FeatureWindow>
    </>
  )
}
