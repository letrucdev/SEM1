'use client'
import { TablePagination } from '@/components/table/Pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_PAGINATION, ORDER_STATUS } from '@/constants'
import { useGetUsersOrders } from '@/hooks/order/useGetUsersOrders'
import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DataTable } from '@/components/table/DataTable'
import Image from 'next/image'
import {
	formatCurrency,
	formatDateTime,
	makeResourcePublicUrlFromPath,
} from '@/lib/utils'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGetOrderStatuses } from '@/hooks/order/useGetOrderStatuses'
import { useUpdateOrderStatus } from '@/hooks/order/useUpdateOrderStatus'

export default function ManageOrdersPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

	const { orders, orderTotal, isPendingGetUsersOrders } = useGetUsersOrders({
		...pagination,
	})

	const { orderStatuses, isPendingGetOrderStatuses } = useGetOrderStatuses()

	const { updateOrderStatusMutate, isPendingUpdateOrderStatus } =
		useUpdateOrderStatus()

	const columns = useMemo(
		() => [
			{
				key: 'product',
				title: 'Product',
				minWidth: 250,
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

	const handleChangeOrderStatus = ({ orderId, status }) => {
		updateOrderStatusMutate({ orderId, status })
	}

	return (
		<div className='flex flex-col xl:flex-row justify-between py-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				{isPendingGetUsersOrders && !orders.length && (
					<>
						<Skeleton className={`w-full h-60`} />
						<Skeleton className={`w-full h-60`} />
						<Skeleton className={`w-full h-60`} />
					</>
				)}

				{!isPendingGetUsersOrders && !orders.length && (
					<span className='text-center'>No data.</span>
				)}

				{!isPendingGetUsersOrders &&
					!!orders.length &&
					orders.map((order) => {
						const rows = order.products.map((product) => ({
							id: product.id,
							product: (
								<span className='flex gap-4 items-center'>
									<Image
										src={makeResourcePublicUrlFromPath(
											product.product_images?.[0]?.image_path
										)}
										width={128}
										height={128}
										alt={product.name}
										className='w-16 h-16 object-scale-down rounded-md'
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
										<div className='flex items-center gap-2'>
											<Select
												disabled={
													isPendingGetOrderStatuses ||
													isPendingUpdateOrderStatus
												}
												defaultValue={order.order_status}
												onValueChange={(value) =>
													handleChangeOrderStatus({
														orderId: order.id,
														status: orderStatuses[value],
													})
												}
											>
												<SelectTrigger className='w-[180px]'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{/* <SelectItem value={ORDER_STATUS.Processing}>
														{ORDER_STATUS.Processing}
													</SelectItem>
													<SelectItem value={ORDER_STATUS.Delivering}>
														{ORDER_STATUS.Delivering}
													</SelectItem>
													<SelectItem value={ORDER_STATUS.Delivered}>
														{ORDER_STATUS.Delivered}
													</SelectItem> */}
													{Object.keys(orderStatuses).map((status) => (
														<SelectItem value={status} key={status}>
															{status}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
										<span className='font-bold mt-2'>
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
									{/* <div className='flex pt-4'>
										<span className='ml-auto'>
											<CancelOrderDialog
												orderId={order.id}
												orderStatus={order.order_status}
											/>
										</span>
									</div> */}
								</CardContent>
							</Card>
						)
					})}

				{!isPendingGetUsersOrders && !!orders.length && (
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
