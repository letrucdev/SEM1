import { courseService } from '@/services/course/courseService'
import { useQuery } from '@tanstack/react-query'

export const useGetCourseDetail = (courseId) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['course', courseId],
		queryFn: () => courseService.getCourseDetail(courseId),
	})

	const course = data?.data?.data
	const isPendingGetCourseDetail = isPending
	const refetchCourseDetail = refetch

	return {
		course,
		isPendingGetCourseDetail,
		refetchCourseDetail,
	}
}
