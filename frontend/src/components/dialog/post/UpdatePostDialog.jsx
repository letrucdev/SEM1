import { memo, useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { UpdatePostForm } from './UpdatePostForm'

export const UpdatePostDialog = memo(
	({ disabled, buttonTriggerClassName, showLabel = true, post }) => {
		const dialogRef = useRef(null)
		const updatePostFormRef = useRef(null)

		const isMutating = useIsMutating()

		const handleConfirm = () => {
			updatePostFormRef.current?.submit()
		}

		const handleCloseDialog = () => dialogRef.current?.close()

		return (
			<ResponsiveDialog
				ref={dialogRef}
				title={'Edit Post'}
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
					<UpdatePostForm
						ref={updatePostFormRef}
						onSuccess={handleCloseDialog}
						post={post}
					/>
				}
				contentClassName='max-w-7xl max-h-[90%]'
				onConfirm={handleConfirm}
				manualClose
			/>
		)
	}
)

UpdatePostDialog.displayName = 'UpdatePostDialog'
