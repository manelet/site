import { slugify as slugifyIt } from 'str'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const capitalize = (str): string => str.charAt(0).toUpperCase() + str.slice(1)

export const slugify = (str: string): string =>
  slugifyIt(
    str
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      )
      .match(/[^_\W]+/g)
      .join(' ')
  )

export const formattedDate = (date: string): string => {
  const dateObj = dayjs(date, 'MMMM DD, YYYY')
  const numberOfDaysSincePublication = dayjs().diff(dateObj, 'day')
  return numberOfDaysSincePublication <= 60 ? dateObj.fromNow() : dateObj.format('DD/MM/YY')
}
