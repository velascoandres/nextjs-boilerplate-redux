import reducer, {
  addNotification,
  NotificationEnum,
  popNotification,
  removeNotificationsById
} from '../notificationSlice'

describe('notificationSlice tests', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, { type: undefined })

    expect(state).toStrictEqual({
      notifications: []
    })
  })

  it('should add a notification', () => {
    const state = reducer(undefined, addNotification({
      id: '1',
      type: NotificationEnum.INFO,
      title: 'title 1',
      content: 'content 1'
    }))

    expect(state).toStrictEqual({
      notifications: [{
        id: '1',
        type: NotificationEnum.INFO,
        title: 'title 1',
        content: 'content 1'
      }]
    })
  })

  it('should remove a notification', () => {
    const oldLoaderState = {
      notifications: [{
        id: '1',
        type: NotificationEnum.INFO,
        title: 'title 1',
        content: 'content 1'
      }]    
    }

    const state = reducer(oldLoaderState, removeNotificationsById('1'))

    expect(state).toStrictEqual({
      notifications: [],
    })
  })

  it('should pop the last notification', () => {
    const oldLoaderState = {
      notifications: [{
        id: '1',
        type: NotificationEnum.INFO,
        title: 'title 1',
        content: 'content 1'
      },
      {
        id: '2',
        type: NotificationEnum.INFO,
        title: 'title 2',
        content: 'content 2'
      }
      ]    
    }

    const state = reducer(oldLoaderState, popNotification({}))

    expect(state).toStrictEqual({
      notifications: [{
        id: '1',
        type: NotificationEnum.INFO,
        title: 'title 1',
        content: 'content 1'
      }]
    })
  })
})
