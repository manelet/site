import Cookies from 'js-cookie'

export function setTheme(theme: string): void {
  if (typeof window === 'undefined') {
    return
  }

  if (theme === 'light') {
    document.querySelector('html').classList.remove('dark')
    // localStorage.theme = 'light'
  }

  if (theme === 'dark') {
    document.querySelector('html').classList.add('dark')
    // localStorage.theme = 'dark'
  }

  Cookies.set('theme', theme)
}

export function getTheme(): string {
  return Cookies.get('theme') || 'light'
  // return typeof window === 'undefined' ? undefined : (localStorage.theme || 'light')
}
