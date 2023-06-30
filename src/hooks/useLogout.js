import { useAuthContext } from './useAuthContext'
import { useItemsContext } from './useItemsContext'


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: itemsDispatch } = useItemsContext()


  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

    // to clear global state of items after logout
    itemsDispatch({ type: 'SET_ITEMS', payload: null })

  }

  return { logout }
}