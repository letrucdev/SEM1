import { memo, useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { CreatePostForm, CreateProductForm } from './CreatePostForm'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const CreatePostDialog = memo(
	({ disabled, buttonTriggerClassName, showLabel = true }) => {
		const dialogRef = useRef(null)
		const createPostFormRef = useRef(null)

		const isMutating = useIsMutating()

		const handleConfirm = () => {
			createPostFormRef.current?.submit()
		}

		const handleCloseDialog = () => dialogRef.current?.close()

		return (
			<ResponsiveDialog
				ref={dialogRef}
				title={'Create Post'}
				triggerElement={
					<Button
						disabled={disabled}
						className={buttonTriggerClassName}
						size={showLabel ? 'default' : 'icon'}
					>
						<Plus /> Create Post
					</Button>
				}
				isPending={isMutating > 0}
				content={
					<CreatePostForm
						ref={createPostFormRef}
						onSuccess={handleCloseDialog}
					/>
				}
				contentClassName='max-w-7xl max-h-[90%]'
				onConfirm={handleConfirm}
				manualClose
			/>
		)
	}
)

CreatePostDialog.displayName = 'CreatePostDialog'
