import { memo, useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { UpdateCourseForm } from './UpdateCourseForm'

export const UpdateCourseDialog = memo(
	({ disabled, buttonTriggerClassName, course }) => {
		const dialogRef = useRef(null)
		const updateCourseFormRef = useRef(null)

		const isMutating = useIsMutating()

		const handleConfirm = () => {
			updateCourseFormRef.current?.submit()
		}

		const handleCloseDialog = () => dialogRef.current?.close()

		return (
			<ResponsiveDialog
				ref={dialogRef}
				title={'Edit Course'}
				triggerElement={
					<Button
						disabled={disabled}
						className={buttonTriggerClassName}
						size={'icon'}
					>
						<Pencil />
					</Button>
				}
				isPending={isMutating > 0}
				content={
					<UpdateCourseForm
						ref={updateCourseFormRef}
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

UpdateCourseDialog.displayName = 'UpdateCourseDialog'
