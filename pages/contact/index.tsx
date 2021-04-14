import { FC, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

import Button from '../../components/button/button'
import { IconGithub } from '../../components/icons/github'
import { IconTwitter } from '../../components/icons/twitter'
import { Wrapper, Inner } from '../../layout/block'

interface FormInputs {
  name: string
  email: string
  message: string
}

const ContactWrapper = styled(Wrapper)`
  ${tw`flex-grow bg-gray-50 dark:bg-second`}
`

const Form = styled.form`
  ${tw`w-full bg-white dark:bg-gray-800 p-6 md:shadow-2xl rounded md:rounded-lg my-10`}
`

const Input = styled.input`
  ${tw`p-2 border border-solid border-gray-200 dark:border-gray-700 w-full bg-white dark:bg-gray-700`}

  &::placeholder {
    ${tw`text-gray-300`}
  }
`

const Hr = styled.hr`
  ${tw`border border-solid border-gray-100 dark:border-second my-5`}
  border-bottom: 0;
`

const Textarea = styled.textarea`
  font-family: 'Inter', sans-serif;
  ${tw`border border-solid border-gray-100 dark:border-gray-700 rounded w-full p-4 bg-white dark:bg-gray-700`}

  &::placeholder {
    ${tw`text-gray-300`}
  }
`

const Contact: FC = () => {
  const [response, setResponse] = useState<any>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleOnSubmit = async (data: FormInputs): Promise<void> => {
    try {
      const httpResponse = await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      const httpJsonResponse = await httpResponse.json()

      setResponse(httpJsonResponse)
    } catch (error) {
      setResponse(error)
    }
  }

  const errorKeys = Object.keys(errors)
  const hasErrors = errorKeys.length > 0 || response?.success === false

  return (
    <>
      <Head>
        <title>Contact - Manel Escuer</title>
      </Head>
      <ContactWrapper>
        <Inner>
          <h1 tw="text-center md:text-left mb-0">Contact</h1>
          <p tw="text-center md:text-left text-gray-500">
            Ideas, questions, something in mind? Don&apos;t hesitate to drop a line!
          </p>

          <div tw="flex w-full flex-col-reverse md:flex-row">
            <Form onSubmit={handleSubmit(handleOnSubmit)}>
              {response?.success && (
                <div tw="mb-6 p-3 bg-green-400 text-white text-xs rounded">
                  Message successfully sent{' '}
                  <span role="img" aria-label="ok">
                    👍
                  </span>
                </div>
              )}

              {hasErrors && (
                <div tw="mb-6 p-3 bg-red-400 text-white text-xs rounded">
                  <ul tw="p-0 list-none">
                    {response.error.response.body.errors.map((e) => (
                      <li key={e.field}>{e.message}</li>
                    ))}
                    {errorKeys.map((key) => (
                      <li key={key}>{`${key} is required`}</li>
                    ))}
                  </ul>
                </div>
              )}
              <h4 tw="mt-0">
                <span role="img" aria-label="happy">
                  🤗
                </span>{' '}
                A bit about you
              </h4>
              <div tw="flex w-full">
                <div tw="flex w-full">
                  <Input
                    type="text"
                    placeholder="Your name"
                    css={['border-right: 0; border-radius: 3px 0 0 3px']}
                    {...register('name', { required: true })}
                  />
                </div>
                <div tw="flex w-full">
                  <Input
                    type="email"
                    placeholder="Your e-mail"
                    css={['border-radius: 0 3px 3px 0']}
                    {...register('email', { required: true })}
                  />
                </div>
              </div>

              <h4>
                <span role="img" aria-label="help">
                  🙋🏻‍♂️
                </span>{' '}
                How can I help you?
              </h4>

              <Textarea
                placeholder="Tell me!"
                cols={30}
                rows={10}
                {...register('message', { required: true })}
              ></Textarea>

              <Hr />

              <Button size="sm" type="submit" as="button">
                Send
              </Button>
            </Form>
            <div tw="w-full md:w-1/2 flex flex-col items-center justify-center md:py-6 md:px-10 text-gray-500">
              <p>I also try to generate some interesting content in...</p>

              <div tw="flex w-full items-center justify-center md:justify-start my-4">
                <div tw="mr-3">
                  <IconGithub strokeWidth={1} fill="rgb(107, 114, 128)" width={26} height={26} />
                </div>

                <div tw="leading-none">
                  <p tw="my-0">Github</p>
                  <p tw="my-0 text-xs">@manelet</p>
                </div>
              </div>

              <div tw="flex w-full items-center justify-center md:justify-start">
                <div tw="mr-3">
                  <IconTwitter strokeWidth={1} fill="rgb(107, 114, 128)" width={26} height={26} />
                </div>

                <div tw="leading-none">
                  <p tw="my-0">Twitter</p>
                  <p tw="my-0 text-xs">@manelescuer</p>
                </div>
              </div>
            </div>
          </div>
        </Inner>
      </ContactWrapper>
    </>
  )
}
export default Contact
