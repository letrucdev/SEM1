import { DEFAULT_PAGINATION } from '@/constants'
import { contactService } from '@/services/contact/contactService'
import { useQuery } from '@tanstack/react-query'

export const getTicketsDefaultParams = {
	...DEFAULT_PAGINATION,
}

export const useGetTickets = (params = getTicketsDefaultParams) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['tickets', params],
		queryFn: () => contactService.getTickets(params),
	})

	const tickets = data?.data?.data || []
	const ticketTotal = data?.data?.total || 0
	const isPendingGetTickets = isPending
	const refetchTickets = refetch

	return {
		tickets,
		ticketTotal,
		isPendingGetTickets,
		refetchTickets,
	}
}
