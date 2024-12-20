import { useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Trash2 } from 'lucide-react'
import { useDeleteProduct } from '@/hooks/product/useDeleteProduct'
import { useDeletePost } from '@/hooks/post/useDeletePost'

export const DeletePostDialog = ({ postId }) => {
	const dialogRef = useRef(null)

	const { deletePostMutateAsync, isPendingDeletePost } = useDeletePost()

	const handleDeletePost = useCallback(
		(postId) => async () => {
			try {
				await deletePostMutateAsync(postId)
			} finally {
				dialogRef.current?.close()
			}
		},
		[deletePostMutateAsync]
	)

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Are you sure you want to delete this post?'}
			description={'This action cannot be undone.'}
			triggerElement={
				<Button
					variant={'destructive'}
					size='icon'
					disabled={isPendingDeletePost}
				>
					<Trash2 />
				</Button>
			}
			onConfirm={handleDeletePost(postId)}
			isPending={isPendingDeletePost}
			manualClose
		/>
	)
}
