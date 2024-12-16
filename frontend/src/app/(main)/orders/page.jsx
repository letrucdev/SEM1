'use client'

import { CancelOrderDialog } from '@/components/dialog/order/CancelOrderDialog'
import { DataTable } from '@/components/table/DataTable'
import { TablePagination } from '@/components/table/Pagination'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_PAGINATION, ORDER_STATUS } from '@/constants'
import { useGetOrders } from '@/hooks/order/useGetOrders'
import {
	cn,
	formatCurrency,
	formatDateTime,
	makeImageUrlFromPath,
} from '@/lib/utils'
import { PackageX } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'

export default function OrdersPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

	const { orders, orderTotal, isPendingGetOrders } = useGetOrders({
		...pagination,
	})

	const columns = useMemo(
		() => [
			{
				key: 'product',
				title: 'Product',
				minWidth: 150,
			},
			{
				key: 'price',
				title: 'Price',
				minWidth: 100,
			},
			{
				key: 'quantity',
				title: 'Quantity',
				minWidth: 100,
			},
			{
				key: 'totalPrice',
				title: 'Total Price',
				minWidth: 100,
			},
		],
		[]
	)

	const handleChangePage = (page) => {
		setPagination((prev) => ({ ...prev, page }))
	}

	const handleChangePageSize = (pageSize) => {
		setPagination((prev) => ({ ...prev, pageSize }))
	}

	return (
		<div className='flex flex-col xl:flex-row justify-between py-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				<div className='flex flex-col mb-3'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4 text-balance'>
						My Orders
					</h2>
				</div>

				{isPendingGetOrders && !orders.length && (
					<>
						<Skeleton className={`w-full h-60`} />
						<Skeleton className={`w-full h-60`} />
						<Skeleton className={`w-full h-60`} />
					</>
				)}

				{!isPendingGetOrders && !orders.length && (
					<span className='text-center'>No data.</span>
				)}

				{!isPendingGetOrders &&
					!!orders.length &&
					orders.map((order) => {
						const rows = order.products.map((product) => ({
							id: product.id,
							product: (
								<span className='flex gap-4 items-center'>
									<Image
										src={makeImageUrlFromPath(
											product.product_images[0].image_path
										)}
										width={128}
										height={128}
										alt={product.name}
										className='w-16 h-16 object-cover rounded-md'
									/>
									{product.name}
								</span>
							),
							price: formatCurrency(product.pivot.price),
							quantity: product.pivot.quantity,
							totalPrice: formatCurrency(
								product.pivot.price * product.pivot.quantity
							),
						}))

						return (
							<Card key={order.id}>
								<CardHeader>
									<div className='flex flex-col'>
										<h3 className='text-xl font-semibold'>
											Order #{order.order} ( {order.delivery_address} )
										</h3>
										<p className='text-muted-foreground'>
											{formatDateTime(order.created_at, true)}
										</p>
									</div>

									<div className='flex flex-col items-end'>
										<div className='flex gap-1'>
											Status:
											<p
												className={cn(
													order.order_status === ORDER_STATUS.Cancelled &&
														'text-destructive',
													order.order_status === ORDER_STATUS.Processing &&
														'text-amber-500',
													order.order_status === ORDER_STATUS.Delivering &&
														'text-primary',
													order.order_status === ORDER_STATUS.Delivered &&
														'text-green-500'
												)}
											>
												{order.order_status}
											</p>
										</div>
										{/* <p>Order date: {formatDateTime(order.created_at, true)}</p> */}
										<span className='font-bold'>
											Total: {formatCurrency(order.totalPrice)}
										</span>
									</div>
								</CardHeader>

								<CardContent>
									<DataTable
										columns={columns}
										rows={rows}
										isPaginated={false}
									/>
									<div className='flex pt-4'>
										<span className='ml-auto'>
											<CancelOrderDialog
												orderId={order.id}
												orderStatus={order.order_status}
											/>
										</span>
									</div>
								</CardContent>
							</Card>
						)
					})}

				{!isPendingGetOrders && !!orders.length && (
					<TablePagination
						onChangePage={handleChangePage}
						onChangePageSize={handleChangePageSize}
						pagination={pagination}
						total={orderTotal}
					/>
				)}
			</div>
		</div>
	)
}
