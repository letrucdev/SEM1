import { memo, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Trash2 } from 'lucide-react'
import { useDeleteCourse } from '@/hooks/course/useDeleteCourse'

export const DeleteCourseDialog = memo(({ courseId }) => {
	const dialogRef = useRef(null)

	const { deleteCourseMutateAsync, isPendingDeleteCourse } = useDeleteCourse()

	const handleDeleteCourse = useCallback(
		(courseId) => async () => {
			try {
				await deleteCourseMutateAsync(courseId)
			} finally {
				dialogRef.current?.close()
			}
		},
		[deleteCourseMutateAsync]
	)

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Are you sure you want to delete this course?'}
			description={'This action cannot be undone.'}
			triggerElement={
				<Button
					variant={'destructive'}
					size='icon'
					disabled={isPendingDeleteCourse}
				>
					<Trash2 />
				</Button>
			}
			onConfirm={handleDeleteCourse(courseId)}
			isPending={isPendingDeleteCourse}
			disabled={isPendingDeleteCourse}
			manualClose
		/>
	)
})

DeleteCourseDialog.displayName = 'DeleteCourseDialog'
