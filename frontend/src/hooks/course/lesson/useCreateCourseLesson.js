import { courseService } from '@/services/course/courseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateCourseLesson = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: courseService.createCourseLesson,
		onSuccess: () => toast.success('Lesson created successfully!'),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ['courseLessons'] }),
	})

	const createCourseLessonResponse = data?.data
	const isPendingCreateCourseLesson = isPending
	const createCourseLessonMutate = mutate
	const createCourseLessonMutateAsync = mutateAsync

	return {
		createCourseLessonResponse,
		isPendingCreateCourseLesson,
		createCourseLessonMutate,
		createCourseLessonMutateAsync,
	}
}
