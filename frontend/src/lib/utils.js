import { clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { config } from './config'

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

export const makeImageUrlFromPath = (path) => {
	return path ? `${config.apiUrl.replace('/api', '/storage')}/${path}` : ''
}

export const formatCurrency = (amount, currency = 'USD') => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
		amount
	)
}
