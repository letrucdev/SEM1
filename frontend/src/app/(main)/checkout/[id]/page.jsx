'use client'
import { PlaceOrderDialog } from '@/components/dialog/checkout/PlaceOrderDialog'
import { DataTable } from '@/components/table/DataTable'
import { formatCurrency, makeImageUrlFromPath } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

export default function CheckoutPage({ params: { id } }) {
	const [cartProducts, setCartProducts] = useState([])

	const columns = useMemo(
		() => [
			{
				key: 'product',
				title: 'Product',
				minWidth: 350,
			},
			{
				key: 'category',
				title: 'Category',
				minWidth: 200,
			},
			{
				key: 'price',
				title: 'Price',
				minWidth: 200,
			},
			{
				key: 'quantity',
				title: 'Quantity',
				minWidth: 200,
			},
		],
		[]
	)

	const rows = useMemo(
		() =>
			cartProducts?.map((cartProduct) => {
				return {
					...cartProduct,

					product: (
						<span className='flex items-center'>
							<Image
								width={128}
								height={128}
								src={makeImageUrlFromPath(
									cartProduct.product_images?.[0]?.image_path
								)}
								alt={cartProduct.name}
								className='w-16 h-16 object-cover rounded-md'
							/>
							<span className='ml-4'>{cartProduct.name}</span>
						</span>
					),
					price: formatCurrency(cartProduct.price),
					category: cartProduct.product_category.name,
					quantity: cartProduct.pivot.quantity,
				}
			}),
		[cartProducts]
	)

	const totalPrice = useMemo(
		() =>
			cartProducts.reduce(
				(total, product) => total + product.pivot.quantity * product.price,
				0
			),
		[cartProducts]
	)

	useEffect(() => {
		const checkoutData = sessionStorage.getItem(`checkout-${id}`)
		if (checkoutData) {
			setCartProducts(JSON.parse(checkoutData))
		} else {
			location.href = '/'

			return
		}
	}, [id])

	return (
		<div className='flex flex-col xl:flex-row justify-between py-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				<div className='flex flex-col mb-3'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4 text-balance'>
						Checkout
					</h2>
					<div className='flex items-center'>
						<div className='flex flex-col mr-auto'>
							<span className='text-secondary-foreground text-sm md:text-lg font-bold'>
								Total: {formatCurrency(totalPrice)}
							</span>
						</div>

						{!!cartProducts.length && (
							<PlaceOrderDialog
								checkOutId={id}
								cartId={cartProducts[0]?.pivot?.cart_id}
								productIds={cartProducts.map((product) => product.id)}
							/>
						)}
					</div>
				</div>

				<DataTable columns={columns} rows={rows} isPaginated={false} />
			</div>
		</div>
	)
}
