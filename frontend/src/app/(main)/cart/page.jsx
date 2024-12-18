'use client'
import { DeleteCartProductDialog } from '@/components/dialog/cart/DeleteCartProductDialog'
import { CartProductQuantityInput } from '@/components/inputs/CartProductQuantityInput'
import { DataTable } from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useGetCartProducts } from '@/hooks/cart/useGetCartProducts'
import { formatCurrency, makeResourcePublicUrlFromPath } from '@/lib/utils'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function CartPage() {
	const [isCheckAll, setIsCheckAll] = useState(false)
	const [checkedProduct, setCheckedProduct] = useState([])

	const { cartProducts, cartProductTotal } = useGetCartProducts()

	const router = useRouter()

	const handleCheckAll = useCallback((checked) => {
		setCheckedProduct([])
		setIsCheckAll(!!checked.valueOf())
	}, [])

	const isCheckedProduct = useCallback(
		(productId) =>
			checkedProduct.some((_productId) => productId === _productId),
		[checkedProduct]
	)

	const handleCheck = useCallback(
		(productId) => () => {
			setCheckedProduct((prev) => {
				return !isCheckedProduct(productId)
					? [...prev, productId]
					: [...prev.filter((_productId) => _productId !== productId)]
			})
			setIsCheckAll(false)
		},
		[isCheckedProduct]
	)

	const totalPrice = useMemo(
		() =>
			cartProducts
				.filter((product) => checkedProduct.includes(product.id))
				.reduce(
					(total, product) => total + product.pivot.quantity * product.price,
					0
				),
		[cartProducts, checkedProduct]
	)

	const columns = useMemo(
		() => [
			{
				key: 'check',
				title: (
					<Checkbox
						checked={isCheckAll}
						onCheckedChange={handleCheckAll}
						disabled={!cartProductTotal}
					/>
				),
				minWidth: 30,
			},
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
			{
				key: 'action',
				title: 'Action',
				minWidth: 200,
			},
		],
		[cartProductTotal, handleCheckAll, isCheckAll]
	)

	const rows = useMemo(
		() =>
			cartProducts?.map((cartProduct) => {
				return {
					...cartProduct,
					check: (
						<Checkbox
							checked={isCheckAll || isCheckedProduct(cartProduct.id)}
							onCheckedChange={handleCheck(cartProduct.id)}
						/>
					),
					product: (
						<span className='flex items-center'>
							<Image
								width={128}
								height={128}
								src={makeResourcePublicUrlFromPath(
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
					quantity: <CartProductQuantityInput cartProduct={cartProduct} />,
					action: (
						<span className='flex gap-2'>
							<DeleteCartProductDialog productId={cartProduct.id} />
						</span>
					),
				}
			}),
		[cartProducts, handleCheck, isCheckAll, isCheckedProduct]
	)

	const handleCheckOut = () => {
		const products = cartProducts.filter((product) =>
			checkedProduct.includes(product.id)
		)
		const checkOutId = Date.now()
		sessionStorage.setItem(`checkout-${checkOutId}`, JSON.stringify(products))
		router.push(`/checkout/${checkOutId}`)
	}

	useEffect(() => {
		if (isCheckAll) {
			if (!cartProducts.length) {
				setIsCheckAll(false)
				setCheckedProduct([])

				return
			}

			setCheckedProduct((prev) => {
				const uniqueIds = new Set([
					...prev,
					...cartProducts.map((product) => product.id),
				])
				return Array.from(uniqueIds)
			})
		}
	}, [cartProducts, isCheckAll])

	return (
		<div className='flex flex-col xl:flex-row justify-between py-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				<div className='flex flex-col mb-3'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4 text-balance'>
						My cart
					</h2>
					<div className='flex items-center'>
						<p className='text-secondary-foreground text-sm md:text-lg font-bold'>
							Total: {formatCurrency(totalPrice)}
						</p>
						<Button
							className='ml-auto'
							disabled={!checkedProduct.length}
							onClick={handleCheckOut}
						>
							<ShoppingBag /> Check Out
						</Button>
					</div>
				</div>

				<DataTable columns={columns} rows={rows} isPaginated={false} />
			</div>
		</div>
	)
}
