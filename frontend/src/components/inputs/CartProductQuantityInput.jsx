import { useCallback, useMemo, useState } from 'react'
import { Input } from '../ui/input'
import { useUpdateCartProduct } from '@/hooks/cart/useUpdateCartProduct'

export const CartProductQuantityInput = ({ cartProduct }) => {
	const [quantity, setQuantity] = useState(cartProduct.pivot.quantity)

	const isDirty = useMemo(
		() => cartProduct.pivot.quantity !== quantity,
		[cartProduct.pivot.quantity, quantity]
	)

	const { isPendingUpdateCartProduct, updateCartProductMutate } =
		useUpdateCartProduct()

	const handleUpdateCartProductQuantity = useCallback(
		({ productId, quantity }) =>
			updateCartProductMutate({ productId, quantity }),
		[updateCartProductMutate]
	)

	const handleChangeProductQuantityInput = (event) => {
		if (event.target.value.trim().length === 0) {
			return setQuantity('')
		}

		if (isNaN(event.target.value) || event.target.value < 1) return

		if (event.target.value > cartProduct.stock) {
			return setQuantity(cartProduct.stock)
		}

		setQuantity(parseInt(event.target.value))
	}

	return (
		<Input
			type='number'
			min={1}
			className='w-28'
			max={cartProduct.stock}
			value={quantity}
			disabled={isPendingUpdateCartProduct}
			onChange={handleChangeProductQuantityInput}
			onBlur={() =>
				isDirty &&
				handleUpdateCartProductQuantity({
					productId: cartProduct.id,
					quantity: quantity,
				})
			}
		/>
	)
}
