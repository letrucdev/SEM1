import { courseService } from '@/services/course/courseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteCourseLesson = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: courseService.deleteCourseLesson,
		onSuccess: () => toast.success('Lesson deleted successfully!'),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ['courseLessons'] }),
	})

	const deleteCourseLessonResponse = data?.data
	const isPendingDeleteCourseLesson = isPending
	const deleteCourseLessonMutate = mutate
	const deleteCourseLessonMutateAsync = mutateAsync

	return {
		deleteCourseLessonResponse,
		isPendingDeleteCourseLesson,
		deleteCourseLessonMutate,
		deleteCourseLessonMutateAsync,
	}
}
