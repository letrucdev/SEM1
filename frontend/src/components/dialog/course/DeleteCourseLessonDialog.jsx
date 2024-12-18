import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { memo, useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { useDeleteCourseLesson } from '@/hooks/course/lesson/useDeleteCourseLesson'

export const DeleteCourseLessonDialog = memo(({ disabled, lesson, course }) => {
	const dialogRef = useRef(null)

	const { deleteCourseLessonMutateAsync, isPendingDeleteCourseLesson } =
		useDeleteCourseLesson()

	const isMutating = useIsMutating()

	const handleConfirm = async () => {
		try {
			await deleteCourseLessonMutateAsync({
				courseId: course.id,
				lessonId: lesson.id,
			})
		} finally {
			dialogRef.current?.close()
		}
	}

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={`Are you sure you want to delete the lesson "${lesson.title}"?`}
			description={'This action cannot be undone.'}
			triggerElement={
				<Button disabled={disabled} size={'icon'} variant='destructive'>
					<Trash2 />
				</Button>
			}
			isPending={isMutating > 0}
			onConfirm={handleConfirm}
			disabled={isPendingDeleteCourseLesson}
			manualClose
		/>
	)
})

DeleteCourseLessonDialog.displayName = 'DeleteCourseLessonDialog'
