'use client'
import { DataTable } from '@/components/table/DataTable'
import { DEFAULT_PAGINATION } from '@/constants'
import { useGetProducts } from '@/hooks/product/useGetProducts'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import {
	ArrowDownWideNarrow,
	ArrowUpWideNarrow,
	ShoppingBasket,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGetProductCategories } from '@/hooks/product/useGetProductCategories'

export default function ManageProductsPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

	const [filters, setFilters] = useState({
		inStock: null,
		sortBy: null,
		category: null,
		search: null,
	})

	const [searchInput, setSearchInput] = useState('')

	const { products, isPendingGetProducts, productTotal } = useGetProducts({
		...pagination,
		...filters,
	})

	const { isPendingGetProductCategories, productCategories } =
		useGetProductCategories()

	const columns = useMemo(
		() => [
			{
				key: 'order',
				title: '#',
				minWidth: 75,
			},
			{
				key: 'name',
				title: 'Name',
				minWidth: 200,
			},
			{
				key: 'price',
				title: 'Price',
				minWidth: 200,
			},
			{
				key: 'stock',
				title: 'Stock',
				minWidth: 200,
			},
			{
				key: 'product_rates_avg_star',
				title: 'Average Rating',
				minWidth: 200,
			},
			{
				key: 'product_category',
				title: 'Category',
				minWidth: 200,
			},
			{
				key: 'created_at',
				title: 'Created At',
				minWidth: 200,
			},
			{
				key: 'updated_at',
				title: 'Updated At',
				minWidth: 200,
			},
		],
		[]
	)

	const rows = useMemo(
		() =>
			products?.map((product, index) => {
				return {
					...product,
					price: formatCurrency(product.price),
					product_category: product.product_category.name,
					created_at: formatDateTime(product.created_at, true),
					updated_at: formatDateTime(product.updated_at, true),
				}
			}),
		[products]
	)

	const filterButtons = [
		{
			label: 'Instock',
			key: 'inStock',
			value: true,
			icon: <ShoppingBasket />,
		},
		{
			label: 'Price low - high',
			key: 'sortBy',
			value: 'price-asc',
			icon: <ArrowUpWideNarrow />,
		},
		{
			label: 'Price high - low',
			key: 'sortBy',
			value: 'price-desc',
			icon: <ArrowDownWideNarrow />,
		},
	]

	const handleSetPage = (page) => {
		setPagination({ ...pagination, page })
	}

	const handleSetPageSize = (pageSize) => {
		setPagination({ page: 0, pageSize })
	}

	const handleChangeFilter = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }))
		setPagination((prev) => ({ ...prev, page: 0 }))
	}

	const handleChangeSearchInput = (event) => {
		setSearchInput(event.target.value)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFilters((prev) => ({ ...prev, search: searchInput }))
		}, 300)

		return () => clearTimeout(timeout)
	}, [searchInput])

	return (
		<div className='flex flex-col xl:flex-row justify-between pt-4 pb-6 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-2 sm:gap-4'>
				<div className='flex flex-wrap gap-3'>
					<div className='flex flex-wrap gap-2'>
						{filterButtons.map((button) => (
							<Button
								key={button.label}
								variant={
									filters[button.key] !== button.value ? 'outline' : 'default'
								}
								onClick={() =>
									handleChangeFilter(
										button.key,
										typeof button.value === 'boolean'
											? !filters[button.key]
											: filters[button.key] === button.value
											? null
											: button.value
									)
								}
							>
								{button.icon} {button.label}
							</Button>
						))}

						<Select
							disabled={isPendingGetProductCategories}
							value={filters.category}
							onValueChange={(value) => handleChangeFilter('category', value)}
						>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='All' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={null}>All</SelectItem>
								{productCategories.map((category) => (
									<SelectItem value={category.slug} key={category.id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Input
						placeholder='Enter product name to search'
						className='w-96 sm:ml-auto'
						value={searchInput}
						onChange={handleChangeSearchInput}
					/>
				</div>

				<DataTable
					columns={columns}
					handleSetPage={handleSetPage}
					handleSetPageSize={handleSetPageSize}
					pagination={pagination}
					rows={rows}
					total={productTotal}
				/>
			</div>
		</div>
	)
}
