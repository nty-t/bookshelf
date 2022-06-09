import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'
import {setQueryDataForBook} from './books'

function useListItems(user) {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),
    config: {
      onSuccess(listItems) {
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })
  return listItems ?? []
}

function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems?.find(li => li.bookId === bookId) ?? null
}

const defaultMutaionOptions = {
  onError(err, variables, recover) {
    if (typeof recover === 'function') {
      recover()
    }
  },
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useUpdateListItem(user, options) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),

    {
      onMutate(newItem) {
        const previousItems = queryCache.getQueryData('list-item')
        queryCache.setQueryData('list-items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })
        return () => queryCache.setQueryData('list-item', previousItems)
      },
      ...defaultMutaionOptions,
      ...options,
    },
  )
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {
      onMutate(removedItem) {
        const previousItems = queryCache.getQueryData('list-item')
        queryCache.setQueryData('list-items', old => {
          return old.filter(item => item.id !== removedItem.id)
        })
        return () => queryCache.setQueryData('list-item', previousItems)
      },
      ...defaultMutaionOptions,
      ...options,
    },
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
