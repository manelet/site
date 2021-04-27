import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import tw, { styled } from 'twin.macro'
import { Project as TProject } from '../@types/projects'

const ProjectsOverview: FC<{ projects: TProject[] }> = ({ projects = [] }) => {
  const { push } = useRouter()

  if (!projects || !projects.length) {
    return null
  }

  return (
    <ProjectsWrapper>
      <ProjectsWrapperInner>
        {projects.map((project) => (
          <Project
            key={project.slug}
            bg={project.background}
            onClick={() => push(`/projects/${project.slug}`)}
          >
            <Link href={`/projects/${project.slug}`}>
              <a>
                <h2 tw="font-bold text-2xl">{project.name}</h2>
              </a>
            </Link>
            <p tw="text-sm">{project.description}</p>
          </Project>
        ))}
      </ProjectsWrapperInner>
    </ProjectsWrapper>
  )
}

const ProjectsWrapper = styled.div`
  ${tw`
  relative
  flex
  py-2
  -mr-10
  md:py-0
  md:mr-0
  md:w-full
  `}

  &:hover {
    &:after {
      opacity: 0.5;
    }
  }

  &:after {
    content: '';

    ${tw`
    absolute
    h-full
    right-0
    bg-gradient-to-l
    dark:from-gray-800
    from-white
    to-transparent
    `}

    width: 50px;
    opacity: 0.35;
    transition: all 0.3s ease-in-out;
  }
`

const ProjectsWrapperInner = styled.div`
  ${tw`flex w-full py-6 overflow-x-scroll	md:pl-10 md:-ml-10`}

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    ${tw`bg-gray-50 dark:bg-gray-800`}
  }

  ::-webkit-scrollbar-thumb {
    ${tw`bg-gray-300 dark:bg-gray-300`}
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    ${tw`bg-gray-400 dark:bg-gray-400`}
  }

  @media screen and (min-width: 768px) {
    width: calc(100% + 2.5rem);
  }
`

const Project = styled.div`
  ${tw`
  flex
  flex-col
  justify-center
  w-full
  my-auto
  cursor-pointer
  py-2
  px-4
  rounded
  text-white
  flex-shrink-0
`}

  max-width: 240px;
  height: 300px;
  transition: all 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;

  ${({ bg }: { bg: string }) => `background: ${bg};`}

  &:not(:last-of-type) {
    margin-right: 2rem;
  }

  &:hover {
    ${tw`shadow-xl`}
    transform: translateY(-10px) scale(1.02);
  }
`

export default ProjectsOverview
