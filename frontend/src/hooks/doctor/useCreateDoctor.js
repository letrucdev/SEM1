import { doctorService } from '@/services/doctor/doctorService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateDoctor = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: doctorService.createDoctor,
		onSuccess: () => {
			toast.success('Create doctor successfully!')
			queryClient.invalidateQueries({ queryKey: ['doctors'] })
		},
	})

	const createDoctorResponse = data?.data
	const isPendingCreateDoctor = isPending
	const createDoctorMutate = mutate
	const createDoctorMutateAsync = mutateAsync

	return {
		createDoctorResponse,
		isPendingCreateDoctor,
		createDoctorMutate,
		createDoctorMutateAsync,
	}
}
