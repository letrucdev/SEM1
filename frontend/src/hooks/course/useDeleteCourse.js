import { courseService } from '@/services/course/courseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteCourse = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: courseService.deleteCourse,
		onSuccess: () => toast.success('Course deleted successfully!'),
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
	})

	const deleteCourseResponse = data?.data
	const isPendingDeleteCourse = isPending
	const deleteCourseMutate = mutate
	const deleteCourseMutateAsync = mutateAsync

	return {
		deleteCourseResponse,
		isPendingDeleteCourse,
		deleteCourseMutate,
		deleteCourseMutateAsync,
	}
}
