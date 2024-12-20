import { doctorService } from '@/services/doctor/doctorService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteDoctor = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: doctorService.deleteDoctor,
		onSuccess: () => {
			toast.success('Doctor deleted successfully!')
			queryClient.invalidateQueries({ queryKey: ['doctors'] })
		},
	})

	const deleteDoctorResponse = data?.data
	const isPendingDeleteDoctor = isPending
	const deleteDoctorMutate = mutate
	const deleteDoctorMutateAsync = mutateAsync

	return {
		deleteDoctorResponse,
		isPendingDeleteDoctor,
		deleteDoctorMutate,
		deleteDoctorMutateAsync,
	}
}
