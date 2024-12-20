import { doctorService } from '@/services/doctor/doctorService'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const getDoctorDefaultParams = {
	page: 0,
	pageSize: 4,
	search: '',
	sortBy: 'created_at-desc',
}

export const useGetDoctors = (params = getDoctorDefaultParams) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['doctors', params],
		queryFn: () => doctorService.getDoctors(params),
		placeholderData: keepPreviousData,
	})

	const doctors = data?.data?.data || []
	const doctorTotal = data?.data?.total ?? 0
	const isPendingGetDoctors = isPending
	const refetchDoctors = refetch

	return {
		doctors,
		doctorTotal,
		isPendingGetDoctors,
		refetchDoctors,
	}
}
