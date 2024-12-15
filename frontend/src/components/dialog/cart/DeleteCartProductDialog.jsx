import { useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Trash2 } from 'lucide-react'
import { useDeleteCartProduct } from '@/hooks/cart/useDeleteCartProduct'

export const DeleteCartProductDialog = ({ productId }) => {
	const dialogRef = useRef(null)

	const { deleteCartProductMutateAsync, isPendingDeleteCartProduct } =
		useDeleteCartProduct()

	const handleDeleteCartProduct = useCallback(
		(productId) => async () => {
			try {
				await deleteCartProductMutateAsync({ productId })
			} finally {
				dialogRef.current?.close()
			}
		},
		[deleteCartProductMutateAsync]
	)

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Are you sure you want to remove this product from cart?'}
			description={'This action cannot be undone.'}
			triggerElement={
				<Button
					variant={'destructive'}
					size='icon'
					disabled={isPendingDeleteCartProduct}
				>
					<Trash2 />
				</Button>
			}
			onConfirm={handleDeleteCartProduct(productId)}
			isPending={isPendingDeleteCartProduct}
			manualClose
		/>
	)
}
