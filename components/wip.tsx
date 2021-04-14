import { FC } from 'react'
import 'twin.macro'

export const Wip: FC = () => {
  return (
    <div tw="w-full flex items-center justify-between bg-gray-100 text-gray-500 text-lg rounded-lg p-4 text-center my-6 font-bold">
      <span role="img" aria-label="wip" tw="text-5xl md:-ml-8">
        🚧
      </span>
      work in progress
      <span role="img" aria-label="wip" tw="text-5xl md:-mr-8">
        🚧
      </span>
    </div>
  )
}
