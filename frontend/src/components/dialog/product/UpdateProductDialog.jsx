import { useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { UpdateProductForm } from './UpdateProductForm'

export const UpdateProductDialog = ({
	disabled,
	buttonTriggerClassName,
	product,
}) => {
	const dialogRef = useRef(null)
	const updateProductRef = useRef(null)

	const isMutating = useIsMutating()

	const handleConfirm = () => {
		updateProductRef.current?.submit()
	}

	const handleCloseDialog = () => dialogRef.current?.close()

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Edit Product'}
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
				<UpdateProductForm
					ref={updateProductRef}
					onSuccess={handleCloseDialog}
					product={product}
				/>
			}
			onConfirm={handleConfirm}
			manualClose
		/>
	)
}
