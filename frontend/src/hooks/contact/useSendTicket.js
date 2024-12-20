import { contactService } from '@/services/contact/contactService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSendTicket = () => {
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: contactService.sendTicket,
		onSuccess: () => toast.success('Send ticket successfully!'),
	})

	const sendTicketResponse = data?.data
	const isPendingSendTicket = isPending
	const sendTicketMutate = mutate
	const sendTicketMutateAsync = mutateAsync

	return {
		sendTicketResponse,
		isPendingSendTicket,
		sendTicketMutate,
		sendTicketMutateAsync,
	}
}
