import { FC, useEffect, useRef, useState } from 'react'
import tw, { styled } from 'twin.macro'
import dayjs from 'dayjs'

import career from '../../career.json'

interface Role {
  role: string
  startedAt: string
  endedAt?: string
}

interface Job {
  roles: Role[]
  company: string
  logo: string
  description: string
}

const TimelineWrapper = styled.div`
  ${tw`relative w-full flex flex-row md:flex-col overflow-x-scroll md:overflow-x-visible py-10 md:py-0`}
`

const Line = styled.div`
  ${tw`bg-gray-300`}
  content: '';
  position: absolute;
  width: ${({ width }: { width: number }) => (width ? `${width}px` : '100%')};
  height: 3px;
  left: 0;
  top: 50%;

  @media screen and (min-width: 768px) {
    left: 0;
    width: 3px;
    height: 100%;
    left: 50%;
    top: 0;
  }
`

const TimelineInner = styled.div`
  ${tw`relative w-full flex flex-row md:flex-col`}
`

const TimelineElement = styled.div`
  ${tw`
  flex
  flex-col
  justify-between
  w-auto
  flex-shrink-0
  md:w-full
  md:flex-row
  md:mb-10
  md:first:mt-10
`}

  @media screen and (min-width: 768px) {
    flex-shrink: 0;
    width: 130%;
    transform: translateX(-11%);
  }

  > div:nth-child(2) > div,
  > div:nth-child(1) > div {
    transition: all 0.25s ease-in-out;
  }

  :nth-child(even) {
    ${tw`md:flex-row-reverse`}

    > div:nth-child(1) {
      ${tw`text-center md:text-left md:justify-start`}
    }

    > div:nth-child(2) {
      ${tw`text-center md:text-right`}
    }
  }

  :nth-child(odd) {
    > div:nth-child(1) {
      ${tw`text-center md:text-right`}
    }

    > div:nth-child(2) {
      ${tw`text-center md:justify-start`}
    }
  }

  :before {
    ${tw`flex bg-gray-300`}
    content: '';
    position: relative;
    width: 12px;
    height: 12px;
    top: calc(50% - 5px);
    left: calc(50% - 10px);
    border-radius: 50%;

    @media screen and (min-width: 768px) {
      position: absolute;
    }
  }

  :hover {
    > div:nth-child(2) > div {
      ${tw`shadow-xl`}
      transform: scale(1.02);
    }

    > div:nth-child(1) > div {
      transform: scale(1.02);
    }
  }
`

const TimelineElementRow = styled.div`
  ${tw`w-auto md:w-full flex items-center p-3 px-10`}
`

const TimelineElementLeft = styled(TimelineElementRow)`
  ${tw`justify-center`}
`

const TimelineElementRight = styled(TimelineElementRow)`
  ${tw`justify-center md:justify-end items-start h-full md:h-auto md:items-center`}
`

export const Timeline: FC = () => {
  const elementRefs = useRef([])
  const [totalWidth, setTotalWidth] = useState<number | undefined>()

  useEffect(() => {
    let width = 0
    elementRefs.current.forEach((el) => {
      width += parseInt(getComputedStyle(el).width)
    })
    setTotalWidth(width)
  }, [])

  return (
    <TimelineWrapper>
      <TimelineInner>
        {career.map((job: Job, i) => (
          <TimelineElement ref={(node) => (elementRefs.current[i] = node)} key={job.logo}>
            <TimelineElementLeft>
              <div tw="w-auto md:w-full flex justify-center md:flex-col flex-shrink-0">
                {job.roles.map((role) => (
                  <div key={role.role} tw="flex flex-col flex-shrink-0 mr-10 last:mr-0 md:mr-0">
                    <h3 tw="mb-0">{role.role}</h3>
                    <p tw="text-xs">
                      {job.company} {dayjs(role.startedAt).format('MMM D, YYYY')} -{' '}
                      {role.endedAt ? dayjs(role.endedAt).format('MMM D, YYYY') : 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </TimelineElementLeft>
            <TimelineElementRight>
              <div tw="max-w-sm md:max-w-sm md:w-full text-gray-500 px-4 -mx-4 py-10 -my-10 rounded-xl">
                {job.description}
              </div>
            </TimelineElementRight>
          </TimelineElement>
        ))}
      </TimelineInner>
      <Line width={totalWidth} />
    </TimelineWrapper>
  )
}
