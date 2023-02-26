import reducer, { addLoaderItem, removeLoaderItem } from '../loaderSlice'

describe('loaderSlice tests', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, { type: undefined })   
      
    expect(state).toStrictEqual({
      loader: []
    })
  })

  it('should add a loader', () => {
    const state = reducer(undefined, addLoaderItem('1'))
      
    expect(state).toStrictEqual({
      loader: ['1']
    })
  })

  it('should remove a loader', () => {
    const oldLoaderState = {
      loader: ['1', '2']
    }

    const state = reducer(oldLoaderState, removeLoaderItem('2'))

    expect(state).toStrictEqual({
      loader: ['1'],
    })
  })
})
