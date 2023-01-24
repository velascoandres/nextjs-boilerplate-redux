import reducer, { logout, setAuth } from '../authSlice'

describe('authSlice tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual({
      success: false,
      error: null,
      loading: false,
      accessToken: '',
      user: {
        email: '',
        firstname: '',
        lastname: '',
        id: 0,
      }
    })
  })    
    
  it('should set auth information', () => {
    expect(reducer(undefined, setAuth({
      accessToken: 'some-token',
      user: {
        email: 'some@mail.com',
        firstname: 'alice',
        lastname: 'foo',
        id: 12,
      }
    }))).toStrictEqual({
      success: true,
      error: null,
      loading: false,
      accessToken: 'some-token',
      user: {
        email: 'some@mail.com',
        firstname: 'alice',
        lastname: 'foo',
        id: 12,
      }
    })
  })

  it('should logout', () => {
    expect(reducer(undefined, logout({}))).toStrictEqual({
      success: false,
      error: null,
      loading: false,
      accessToken: '',
      user: {
        email: '',
        firstname: '',
        lastname: '',
        id: 0,
      }
    })
  })
})
