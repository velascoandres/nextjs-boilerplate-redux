import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '@/store/baseQuery'

export const ENDPOINTS_TAGS = {
  AUTH: 'AUTH',
}


export const rootApi = createApi({
  reducerPath: 'rootServices',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: Object.values(ENDPOINTS_TAGS),
})
