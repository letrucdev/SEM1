import { useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { PackagePlus } from 'lucide-react'
import { PlaceOrderForm } from './PlaceOrderForm'

export const PlaceOrderDialog = ({
	disabled,
	buttonTriggerClassName,
	showLabel = true,
	checkOutId,
	cartId,
	productIds,
}) => {
	const dialogRef = useRef(null)
	const placeOrderFormRef = useRef(null)

	const isMutating = useIsMutating()

	const handleConfirm = () => {
		placeOrderFormRef.current?.submit()
	}

	const handleCloseDialog = () => dialogRef.current?.close()

	const onSuccess = () => {
		handleCloseDialog()
		localStorage.removeItem(`checkout-${checkOutId}`)
	}

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Create Product Category'}
			triggerElement={
				<Button
					disabled={disabled}
					className={buttonTriggerClassName}
					size={showLabel ? 'default' : 'icon'}
				>
					<PackagePlus /> Place Order
				</Button>
			}
			isPending={isMutating > 0}
			content={
				<PlaceOrderForm
					products={productIds}
					cartId={cartId}
					ref={placeOrderFormRef}
					onSuccess={onSuccess}
				/>
			}
			onConfirm={handleConfirm}
			manualClose
		/>
	)
}
