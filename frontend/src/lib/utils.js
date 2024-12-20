import { clsx } from 'clsx'
import {
	format,
	hoursToMinutes,
	minutesToHours,
	minutesToSeconds,
	secondsToHours,
	secondsToMinutes,
} from 'date-fns'
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

export const formatDuration = (duration) => {
	const hoursPart = secondsToHours(duration)

	const minutesPart =
		secondsToMinutes(duration) >= hoursToMinutes(hoursPart)
			? secondsToMinutes(duration) - hoursToMinutes(hoursPart)
			: secondsToMinutes(duration)

	const secondsPart =
		minutesToSeconds(minutesPart) === duration
			? 0
			: duration - secondsToMinutes(duration) * 60

	const formattedHoursPart =
		hoursPart.toString().length < 2 ? `0${hoursPart}` : hoursPart
	const formattedMinutesPart =
		minutesPart.toString().length < 2 ? `0${minutesPart}` : minutesPart
	const formattedSecondsPart =
		secondsPart.toString().length < 2 ? `0${secondsPart}` : secondsPart

	return `${
		formattedHoursPart !== '00' ? `${formattedHoursPart}:`  : ''
	}${formattedMinutesPart}:${formattedSecondsPart}`
}
