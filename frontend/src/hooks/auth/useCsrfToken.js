import { authService } from '@/services/auth/authService'
import { useQuery } from '@tanstack/react-query'

export const useCsrfToken = () => {
	const { data, isPending } = useQuery({
		queryKey: ['csrfToken'],
		queryFn: async () => {
			await authService.csrfToken()
			return ''
		},
		staleTime: Infinity, // 1 minute
	})
	const csrfTokenResponse = data?.data
	const isPendingCsrfToken = isPending

	return { csrfTokenResponse, isPendingCsrfToken }
}
