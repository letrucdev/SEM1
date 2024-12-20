import { courseService } from '@/services/course/courseService'
import { useQuery } from '@tanstack/react-query'

export const useGetCourseLessonDetail = ({ courseId, lessonId }) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['courseLesson', courseId, lessonId],
		queryFn: () => courseService.getCourseLessonDetail(courseId, lessonId),
	})

	const courseLesson = data?.data?.data
	const isPendingGetCourseLessonDetail = isPending
	const refetchCourseLessonDetail = refetch

	return {
		courseLesson,
		isPendingGetCourseLessonDetail,
		refetchCourseLessonDetail,
	}
}
