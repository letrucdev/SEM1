import { courseService } from '@/services/course/courseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateCourse = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: courseService.createCourse,
		onSuccess: () => toast.success('Course created successfully!'),
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
	})

	const createCourseResponse = data?.data
	const isPendingCreateCourse = isPending
	const createCourseMutate = mutate
	const createCourseMutateAsync = mutateAsync

	return {
		createCourseResponse,
		isPendingCreateCourse,
		createCourseMutate,
		createCourseMutateAsync,
	}
}
