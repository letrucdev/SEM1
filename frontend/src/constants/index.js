import { minutesToMilliseconds } from 'date-fns'

export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm:ss'
export const DATE_FORMAT = 'dd/MM/yyyy'
export const API_DATETIME_FORMAT = 'yyyyMMdd HH:mm:ss'
export const API_DATE_FORMAT = 'yyyyMMdd'
export const REQUEST_API_DATE_FORMAT = 'yyyy/MM/dd'

export const PAGE_SIZES = [5, 10, 20, 100]

export const DEFAULT_PAGINATION = { page: 0, pageSize: 10 }

export const MAX_DISPLAY_NUMBER = 99

/* React Query */
export const QUERIES_STALE_TIME = minutesToMilliseconds(45)
export const QUERIES_GC_TIME = minutesToMilliseconds(60)
export const QUERIES_REFETCH_INTERVAL = minutesToMilliseconds(5)
