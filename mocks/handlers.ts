/* eslint-disable max-params */
import { rest } from 'msw'

import { HTTP_CODES } from '@/constants/httpCodes'

export const handlers = [
  rest.post('https://fake-api/foo', (req, res, ctx) => {
    if (req.headers.get('Authorization')) {
      return res(
        ctx.status(HTTP_CODES.OK),
        ctx.json({
          data: req.headers.get('Authorization'),
        })
      )  
    }
    
    return res(
      // Respond with a 200 status code
      ctx.status(HTTP_CODES.OK)
    )
  }),

  rest.get('https://fake-api/foo', (req, res, ctx) => {
    return res(
      ctx.status(HTTP_CODES.OK),
      ctx.json({
        data: 'fancy data string',
      })
    )
  }),
]


export const errorHandlers = [
  rest.get('https://fake-api/foo', (req, res, ctx) => {
    return res(
      ctx.status(HTTP_CODES.BAD_REQUEST),
      ctx.json({
        message: 'some error',
      })
    )
  })
]

