import { Button } from '@/components/ui/button'
import { FilePen } from 'lucide-react'
import { memo, useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { UpdateCourseLessonForm } from './UpdateCourseLessonForm'

export const UpdateCourseLessonDialog = memo(
	({ disabled, buttonTriggerClassName, lesson, course }) => {
		const dialogRef = useRef(null)
		const updateCourseLessonFormRef = useRef(null)

		const isMutating = useIsMutating()

		const handleConfirm = () => {
			updateCourseLessonFormRef.current?.submit()
		}

		const handleCloseDialog = () => dialogRef.current?.close()

		return (
			<ResponsiveDialog
				ref={dialogRef}
				title={'Edit Course Lesson'}
				triggerElement={
					<Button
						disabled={disabled}
						className={buttonTriggerClassName}
						size={'icon'}
					>
						<FilePen />
					</Button>
				}
				isPending={isMutating > 0}
				content={
					<UpdateCourseLessonForm
						ref={updateCourseLessonFormRef}
						onSuccess={handleCloseDialog}
						lesson={lesson}
						course={course}
					/>
				}
				onConfirm={handleConfirm}
				manualClose
			/>
		)
	}
)

UpdateCourseLessonDialog.displayName = 'UpdateCourseLessonDialog'
