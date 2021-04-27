import { useState, RefObject, createContext, useContext, FC, useRef, useCallback } from 'react'

interface UseDropdown {
  isOpen: boolean
  refs?: Record<string, RefObject<HTMLDivElement>>
  toggleMenu?: () => void
  openMenu?: () => void
  closeMenu?: () => void
}

const DropdownContext = createContext<UseDropdown>({ isOpen: false })

export const Provider: FC = ({ children }) => {
  const [isOpen, toggleOpen] = useState(false)

  const refs = {
    wrapper: useRef<HTMLDivElement>(),
    toggle: useRef<HTMLDivElement>(),
    menu: useRef<HTMLDivElement>(),
  }

  const openMenu = useCallback((): void => !isOpen && toggleOpen(true), [toggleOpen, isOpen])
  const closeMenu = useCallback((): void => isOpen && toggleOpen(false), [toggleOpen, isOpen])
  const toggleMenu = useCallback((): void => toggleOpen(!isOpen), [toggleOpen, isOpen])

  return (
    <DropdownContext.Provider value={{ isOpen, refs, openMenu, closeMenu, toggleMenu }}>
      {children}
    </DropdownContext.Provider>
  )
}

export function useDropdown(): UseDropdown {
  return useContext(DropdownContext)
}
