import { clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { config } from './config'
import { MAX_DISPLAY_NUMBER } from '@/constants'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const formatDateForm = (dateString) => {
	if (!dateString) return ''
	try {
		return format(dateString, 'yyyy-MM-dd')
	} catch {
		return ''
	}
}

export const formatDateTime = (dateString, time = false) => {
	if (!dateString) return ''
	try {
		return format(dateString, !time ? 'dd-MM-yyyy' : 'dd-MM-yyyy HH:mm:ss')
	} catch {
		return ''
	}
}

export const makeResourcePublicUrlFromPath = (path) => {
	return path ? `${config.rootApiDomain}/storage/${path}` : ''
}

export const formatCurrency = (amount, currency = 'USD') => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
		amount
	)
}

export const formatBigNumber = (value, maxValue = MAX_DISPLAY_NUMBER) => {
	return value >= maxValue ? `${maxValue}+` : value
}
