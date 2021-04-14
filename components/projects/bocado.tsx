import Link from 'next/link'
import { FC } from 'react'
import { Feature } from '../feature'

export const Bocado: FC = () => {
  return (
    <>
      <Feature>
        {[
          '',
          <>
            <h2>A project born during pandemic lockdown</h2>
            <p>
              It was during first pandemic lockdown around March when me,{' '}
              <a href="https://twitter.com/jordicrisol" target="_blank" rel="noopener noreferrer">
                Jordi
              </a>{' '}
              and{' '}
              <a
                href="https://www.instagram.com/raquelsancho/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Raquel
              </a>{' '}
              started talking about trying to bootstrap something while at home.
            </p>
            <p>
              We all like food and eating very much so we decided to start thinking about something
              food-related, and we came up with{' '}
              <b>
                <span role="img" aria-label="bocado">
                  🥑
                </span>{' '}
                bocado
              </b>
            </p>
          </>,
        ]}
      </Feature>
      <Feature>
        {[
          '',
          <>
            <h2>Meal planning</h2>
            <p>
              Customizable dynamically generated meal plans based on your user preferences. Save
              time and discover new recipes that will help you leverage both health and pleasure.
            </p>
          </>,
        ]}
      </Feature>
      <Feature>
        {[
          '',
          <>
            <h2>Your own recipe book</h2>
            <p>Easily create your own recipe book both from your laptor or your mobile.</p>
            <p>
              We believe media as a main tool for describing recipes therefor we use AI to guess
              recipes metadata powered by{' '}
              <span role="img" aria-label="robot">
                🤖
              </span>{' '}
              <Link href="/projects/nyora" passHref>
                nyora
              </Link>
              .
            </p>
          </>,
        ]}
      </Feature>
      <Feature>
        {[
          '',
          <>
            <h2>Learn & discover</h2>
            <p>
              Discover recipes, food tips and tricks from both people around you and food
              influencers with{' '}
              <span role="img" aria-label="tips">
                🤳🏻
              </span>{' '}
              <b>Tips</b>
            </p>
            <p>
              <span role="img" aria-label="tips">
                🤳🏻
              </span>{' '}
              <b>Tips</b> are small (or large), with text (or just videos or photos) portions of
              content that will enlight your cooking world
            </p>
          </>,
        ]}
      </Feature>
    </>
  )
}
