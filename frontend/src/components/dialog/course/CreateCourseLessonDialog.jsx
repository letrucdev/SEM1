import { memo, useRef } from 'react'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { useIsMutating } from '@tanstack/react-query'
import { FilePlus } from 'lucide-react'
import { CreateCourseLessonForm } from './CreateCourseLessonForm'

export const CreateCourseLessonDialog = memo(
	({ disabled, buttonTriggerClassName, showLabel = true, course }) => {
		const dialogRef = useRef(null)
		const createCourseLessonFormRef = useRef(null)

		const isMutating = useIsMutating()

		const handleConfirm = () => {
			createCourseLessonFormRef.current?.submit()
		}

		const handleCloseDialog = () => dialogRef.current?.close()

		return (
			<ResponsiveDialog
				ref={dialogRef}
				title={'Create Course Lesson'}
				triggerElement={
					<Button
						disabled={disabled}
						className={buttonTriggerClassName}
						size={showLabel ? 'default' : 'icon'}
					>
						<FilePlus /> {showLabel && 'Create lesson'}
					</Button>
				}
				isPending={isMutating > 0}
				content={
					<CreateCourseLessonForm
						ref={createCourseLessonFormRef}
						onSuccess={handleCloseDialog}
						course={course}
					/>
				}
				onConfirm={handleConfirm}
				manualClose
			/>
		)
	}
)

CreateCourseLessonDialog.displayName = 'CreateCourseLessonDialog'
