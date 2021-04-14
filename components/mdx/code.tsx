import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { FC, HTMLProps } from 'react'
import { styled } from 'twin.macro'

interface CodeProps {
  showLineNumber?: boolean
  children: string
}

const CodeWrapper = styled.div``

export const Code: FC<CodeProps & HTMLProps<HTMLElement>> = ({
  className,
  children,
  showLineNumber = false,
}) => {
  const language = (className ? className.replace(/language-/, '') : 'js') as Language

  return (
    <CodeWrapper>
      <Highlight {...defaultProps} code={children} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: `code-line-${i}` })} key={`code-line-${i}`}>
                {showLineNumber && <span className="line-number">{i + 1}</span>}
                {line
                  .filter((token) => !token.empty)
                  .map((token, key) => (
                    <span {...getTokenProps({ token, key })} key={key} />
                  ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </CodeWrapper>
  )
}
