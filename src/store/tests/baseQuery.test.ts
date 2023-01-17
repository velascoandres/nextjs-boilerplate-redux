/* eslint-disable @typescript-eslint/ban-types */
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { BaseQueryApi } from '@reduxjs/toolkit/query'

import { addLoaderItem, removeLoaderItem } from '@/common/slices/loaderSlice'
import { addNotification, NotificationEnum, removeNotificationsById } from '@/common/slices/notificationSlice'
import { errorHandlers } from '@/mocks/handlers'
import { server } from '@/mocks/server'
import { axiosBaseQuery, IBaseError } from '@/store/baseQuery'
import { IRootState } from '@/store/store'


const RealDate = Date.now

const TEST_BASE_URL = 'https://fake-api/'
const MOCKED_DATETIME = 1670261796684

const getSuccessAlert = () => ({
  title: 'success title 1',
  content: 'All ok',
})

jest.useFakeTimers()

const dispatchMock = jest.fn()
const getStateMock = () => ({
  auth: {
    accessToken: '',
  }
} as IRootState)

const getAuthStateMock = () => ({
  auth: {
    accessToken: 'some-jwt-token',
  }
} as IRootState)

const mockApiState = {
  dispatch: dispatchMock,
  getState: jest.fn(getStateMock),
} as unknown as BaseQueryApi

const mockApiAuthState = {
  dispatch: dispatchMock,
  getState: jest.fn(getAuthStateMock),
} as unknown as BaseQueryApi

describe('axiosBaseQuery Tests', () => {
  beforeAll(() => global.Date.now = jest.fn(() => MOCKED_DATETIME))
  afterAll(() => global.Date.now = RealDate)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => server.resetHandlers())

  describe('When function is called', () => {
    it('should return an axios handler function', () => {
      const handler = axiosBaseQuery({
        baseUrl: TEST_BASE_URL,
      })

      expect(handler).toStrictEqual(expect.any(Function))
    })
  })

  describe('When axios handler is called', () => {
    const handler = axiosBaseQuery({
      baseUrl: TEST_BASE_URL,
    })

    beforeAll(() => server.listen())
    afterAll(() => server.close())


    describe('When is called with an auth state to protected endpoint', () => {
      let response: QueryReturnValue<unknown, IBaseError, {}>

      beforeEach(async () => {
        response = await handler({
          url: 'foo',
          method: 'POST',
          body: {}
        },
        mockApiAuthState,
        {}
        )
      })

      it('should return the bearer jwt token', () => {
        expect(response.data).toStrictEqual(expect.objectContaining({
          data: 'Bearer some-jwt-token',
        }))
      })
    })


    describe('When axios request is called without notifications', () => {

      beforeEach(async () => {
        await handler({
          url: 'foo',
          method: 'GET',
        },
        mockApiState,
        {}
        )
      })

      it('should dispatch an addLoader action', () => {
        expect(dispatchMock).toHaveBeenCalledWith(
          addLoaderItem(MOCKED_DATETIME.toString())
        )
      })

      it('should dispatch a removeLoader action', () => {
        expect(dispatchMock).toHaveBeenCalledWith(
          removeLoaderItem(MOCKED_DATETIME.toString())
        )
      })
    })

    describe('When axios request is called with notifications', () => {

      beforeEach(async () => {
        await handler({
          url: 'foo',
          method: 'GET',
          getSuccessAlert,
        },
        mockApiState,
        {}
        )
      })

      it('should dispatch an removeNotification action', () => {
        jest.runAllTimers()

        expect(dispatchMock).toHaveBeenCalledWith(
          removeNotificationsById(MOCKED_DATETIME.toString())
        )
      })
    })

    describe('When axios request is success without notification', () => {
      let response: QueryReturnValue<unknown, IBaseError, {}>
      
      beforeEach(async () => {
        response = await handler({
          url: 'foo',
          method: 'GET'
        },
        mockApiState,
        {}
        )
      })
        
      it('should return a response', () => {
        expect(response.data).toStrictEqual({
          data: 'fancy data string',
        })
      })
    })

    describe('When request is failed without notifications', () => {
      let response: QueryReturnValue<unknown, IBaseError, {}>

      beforeEach(async () => {
        server.use(...errorHandlers)
        
        response = await handler({
          url: 'foo',
          method: 'GET'
        },
        mockApiState,
        {}
        )
      })
      
      it('should return an error', () => {
        expect(response.error).toStrictEqual({
          data: {
            message: 'some error',
          },
          status: 400,
        })
      })
    })

    describe('When axios request is success with notification', () => {
      beforeEach(async () => {
        await handler({
          url: 'foo',
          method: 'GET',
          getSuccessAlert,
        },
        mockApiState,
        {}
        )
      })

      it('should dispatch a success notification', () => {
        expect(dispatchMock).toBeCalledWith(
          addNotification({
            id: MOCKED_DATETIME.toString(),
            type: NotificationEnum.SUCCESS,
            title: 'success title 1',
            content: 'All ok',
          })
        )
      })
    })  
  })
})
