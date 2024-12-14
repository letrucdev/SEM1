import { useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Trash2 } from 'lucide-react'
import { useDeleteProduct } from '@/hooks/product/useDeleteProduct'

export const DeleteProductDialog = ({ productId }) => {
	const dialogRef = useRef(null)

	const { deleteProductMutateAsync, isPendingDeleteProduct } =
		useDeleteProduct()

	const handleRejectTransaction = useCallback(
		(productId) => async () => {
			try {
				await deleteProductMutateAsync(productId)
			} finally {
				dialogRef.current?.close()
			}
		},
		[deleteProductMutateAsync]
	)

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Are you sure you want to delete this product?'}
			description={'This action cannot be undone.'}
			triggerElement={
				<Button
					variant={'destructive'}
					size='icon'
					disabled={isPendingDeleteProduct}
				>
					<Trash2 />
				</Button>
			}
			onConfirm={handleRejectTransaction(productId)}
			isPending={isPendingDeleteProduct}
			manualClose
		/>
	)
}
