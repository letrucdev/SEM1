import { DEFAULT_PAGINATION } from '@/constants'
import { courseService } from '@/services/course/courseService'
import { useQuery } from '@tanstack/react-query'

const getCoursesDefaultParams = {
	...DEFAULT_PAGINATION,
	search: '',
}

export const useGetCourses = (params = getCoursesDefaultParams) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['courses', params],
		queryFn: () => courseService.getCourses(params),
	})

	const courses = data?.data?.data || []
	const courseTotal = data?.data?.total || 0
	const isPendingGetCourses = isPending
	const refetchCourses = refetch

	return {
		courses,
		courseTotal,
		isPendingGetCourses,
		refetchCourses,
	}
}
