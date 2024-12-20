import { courseService } from '@/services/course/courseService'
import { useQuery } from '@tanstack/react-query'

export const useGetCourseLessons = ({ courseId }) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['courseLessons', courseId],
		queryFn: () => courseService.getCourseLessons(courseId),
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
