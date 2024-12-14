import { doctorService } from '@/services/doctor/doctorService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateDoctor = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: doctorService.updateDoctor,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['doctors'] })
			toast.success('Doctor profile updated successfully!')
		},
	})

	const updateDoctorResponse = data?.data
	const isPendingUpdateDoctor = isPending
	const updateDoctorMutate = mutate
	const updateDoctorMutateAsync = mutateAsync

	return {
		updateDoctorResponse,
		isPendingUpdateDoctor,
		updateDoctorMutate,
		updateDoctorMutateAsync,
	}
}
