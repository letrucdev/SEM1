import { courseService } from '@/services/course/courseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateCourseLesson = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: courseService.updateCourseLesson,
		onSuccess: () => toast.success('Lesson updated successfully!'),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ['courseLessons'] }),
	})

	const updateCourseLessonResponse = data?.data
	const isPendingUpdateCourseLesson = isPending
	const updateCourseLessonMutate = mutate
	const updateCourseLessonMutateAsync = mutateAsync

	return {
		updateCourseLessonResponse,
		isPendingUpdateCourseLesson,
		updateCourseLessonMutate,
		updateCourseLessonMutateAsync,
	}
}
