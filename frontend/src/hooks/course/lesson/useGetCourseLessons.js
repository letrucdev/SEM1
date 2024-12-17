import { courseService } from '@/services/course/courseService'
import { useQuery } from '@tanstack/react-query'

export const useGetCourseLessons = () => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['courseLessons'],
		queryFn: () => courseService.getCourseLessons(),
	})

	const courseLessons = data?.data?.data || []
	const isPendingGetCourseLessons = isPending
	const refetchCourseLessons = refetch

	return {
		courseLessons,
		isPendingGetCourseLessons,
		refetchCourseLessons,
	}
}
