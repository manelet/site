import { createContext, useReducer, useMemo, useContext, useEffect, FC } from 'react'
import { Category } from '../@types/category'
import { AppPropsEnhanced } from '../pages/_app'
import { getTheme, setTheme } from './dark-theme'

interface State {
  showMobileMenu: boolean
  theme: string
}

type LayoutContext = {
  state: State
  dispatch: React.Dispatch<{ type: string }>
}

type Actions = Record<string, (payload?) => void>

const initialState: State = {
  showMobileMenu: false,
  theme: null,
}

const Context = createContext<LayoutContext>({ state: initialState, dispatch: () => null })
const actions = {
  TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
  UPDATE_THEME: 'UPDATE_THEME',
}

function createFunctionName(actionName): string {
  return actionName
    .split('_')
    .map((p, i) =>
      i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
    )
    .join('')
}

function createActions(dispatch): Actions {
  return Object.keys(actions).reduce((actions, actionName) => {
    const name = createFunctionName(actionName)
    actions[name] = (payload) => {
      if (actionName === 'UPDATE_THEME') {
        setTheme(payload)
      }

      dispatch({ type: actionName, payload })
    }
    return actions
  }, {})
}

function reducer(state = initialState, action): State {
  switch (action.type) {
    case actions.TOGGLE_MOBILE_MENU:
      return { ...state, showMobileMenu: !state.showMobileMenu }
    case actions.UPDATE_THEME:
      return { ...state, theme: action.payload }
    default:
      return { ...state }
  }
}

export const Provider: FC<Partial<AppPropsEnhanced>> = ({ children, theme }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    theme: theme || getTheme(),
  })

  useEffect(() => {
    if (state.theme) {
      setTheme(state.theme)
    }
    // eslint-disable-next-line
  }, [])

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export function useLayout(): { state: State; actions: Actions } {
  const { state, dispatch } = useContext(Context)
  const actions = useMemo(() => createActions(dispatch), []) // eslint-disable-line
  return { state, actions }
}
