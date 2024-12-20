import { useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Package } from 'lucide-react'
import { useCancelOrder } from '@/hooks/order/useCancelOrder'
import { ORDER_STATUS } from '@/constants'

export const CancelOrderDialog = ({ orderId, orderStatus }) => {
	const dialogRef = useRef(null)

	const { isPendingCancelOrder, cancelOrderMutateAsync } = useCancelOrder()

	const handleCancelOrder = useCallback(
		(orderId) => async () => {
			try {
				await cancelOrderMutateAsync({ orderId })
			} finally {
				dialogRef.current?.close()
			}
		},
		[cancelOrderMutateAsync]
	)

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Are you sure you want to cancel this order?'}
			description={'This action cannot be undone.'}
			triggerElement={
				<Button
					variant='destructive'
					className='ml-auto'
					disabled={orderStatus !== ORDER_STATUS.Processing}
				>
					<Package /> Cancel Order
				</Button>
			}
			onConfirm={handleCancelOrder(orderId)}
			isPending={isPendingCancelOrder}
			disabled={orderStatus !== ORDER_STATUS.Processing}
			manualClose
		/>
	)
}
