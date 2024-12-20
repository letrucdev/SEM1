import { memo, useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { CreateCourseForm } from './CreateCourseForm'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'

export const CreateCourseDialog = memo(
	({ disabled, buttonTriggerClassName, showLabel = true }) => {
		const dialogRef = useRef(null)
		const createCourseFormRef = useRef(null)

		const isMutating = useIsMutating()

		const handleConfirm = () => {
			createCourseFormRef.current?.submit()
		}

		const handleCloseDialog = () => dialogRef.current?.close()

		return (
			<ResponsiveDialog
				ref={dialogRef}
				title={'Create Course'}
				triggerElement={
					<Button
						disabled={disabled}
						className={buttonTriggerClassName}
						size={showLabel ? 'default' : 'icon'}
					>
						<GraduationCap /> Create Course
					</Button>
				}
				isPending={isMutating > 0}
				content={
					<CreateCourseForm
						ref={createCourseFormRef}
						onSuccess={handleCloseDialog}
					/>
				}
				onConfirm={handleConfirm}
				disabled={disabled}
				manualClose
			/>
		)
	}
)

CreateCourseDialog.displayName = 'CreateCourseDialog'
