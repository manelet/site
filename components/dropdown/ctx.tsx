import { createRef, useState, useCallback, useLayoutEffect, RefObject } from 'react'

interface UseDropdown {
  isHovered: boolean
  toggleIsHovered: (isHovered: boolean) => void
  open: boolean
  refs: Record<string, RefObject<HTMLDivElement>>
}

const refs = {
  wrapper: createRef<HTMLDivElement>(),
  toggle: createRef<HTMLDivElement>(),
  menu: createRef<HTMLDivElement>(),
}

export function useDropdown(): UseDropdown {
  const [open, toggleOpen] = useState(false)
  const [isHovered, toggleIsHovered] = useState(false)

  const onMouseOut = useCallback(() => {
    toggleOpen(false)
  }, [])

  const onMouseOver = useCallback(() => {
    toggleOpen(true)
  }, [])

  useLayoutEffect(() => {
    refs.wrapper.current.addEventListener('mouseenter', onMouseOver)
    refs.wrapper.current.addEventListener('mouseleave', onMouseOut)

    return () => {
      refs.wrapper.current.removeEventListener('mouseenter', onMouseOver)
      refs.wrapper.current.removeEventListener('mouseleave', onMouseOut)
    }

    // eslint-disable-next-line
  }, [])

  return { refs, isHovered, toggleIsHovered, open }
}
