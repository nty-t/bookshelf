import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'

function useListItems(user) {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),
  })
  return listItems ?? []
}

function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems?.find(li => li.bookId === bookId) ?? null
}

const defaultMutaionOptions = {
    onSettled: () => queryCache.invalidateQueries('list-items')
}

function useUpdateListItem(user, options) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    {...defaultMutaionOptions, ...options},
  )
}

function useRemoveListItem(user ,options) {
  return useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {...defaultMutaionOptions, ...options},
  )
}

function useCreateListItem(user, options) {
  return useMutation(
    ({bookId}) => client('list-items', {data: {bookId}, token: user.token}),
    {...defaultMutaionOptions, ...options},
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
