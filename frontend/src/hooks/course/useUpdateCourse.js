import { courseService } from '@/services/course/courseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateCourse = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: courseService.updateCourse,
		onSuccess: () => toast.success('Course updated successfully!'),
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
	})

	const updateCourseResponse = data?.data
	const isPendingUpdateCourse = isPending
	const updateCourseMutate = mutate
	const updateCourseMutateAsync = mutateAsync

	return {
		updateCourseResponse,
		isPendingUpdateCourse,
		updateCourseMutate,
		updateCourseMutateAsync,
	}
}
