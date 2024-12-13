'use client'

import { ProductCard } from '@/components/cards/ProductCard'
import { ProductCardSkeleton } from '@/components/cards/ProductCardSkeleton'
import { TablePagination } from '@/components/table/Pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { DEFAULT_PAGINATION } from '@/constants'
import { useGetProductCategories } from '@/hooks/product/useGetProductCategories'
import { useGetProducts } from '@/hooks/product/useGetProducts'
import {
	ArrowDownWideNarrow,
	ArrowUpWideNarrow,
	ShoppingBasket,
} from 'lucide-react'
import React, { useEffect } from 'react'

export default function ProductsPage() {
	const [pagination, setPagination] = React.useState(DEFAULT_PAGINATION)

	const [filters, setFilters] = React.useState({
		inStock: null,
		sortBy: null,
		category: null,
		search: null,
	})

	const [searchInput, setSearchInput] = React.useState('')

	const { products, productTotal, isPendingGetProducts } = useGetProducts({
		...pagination,
		...filters,
	})

	const { productCategories, isPendingGetProductCategories } =
		useGetProductCategories()

	const handleChangePage = (page) => {
		setPagination((prev) => ({ ...prev, page }))
	}

	const handleChangePageSize = (pageSize) => {
		setPagination((prev) => ({ ...prev, pageSize }))
	}

	const handleChangeFilter = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }))
		setPagination((prev) => ({ ...prev, page: 0 }))
	}

	const handleChangeSearchInput = (event) => {
		setSearchInput(event.target.value)
	}

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

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFilters((prev) => ({ ...prev, search: searchInput }))
		}, 300)

		return () => clearTimeout(timeout)
	}, [searchInput])

	return (
		<div className='flex flex-col xl:flex-row justify-between py-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				<div className='flex flex-col mb-3'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4 text-balance'>
						Products
					</h2>
					<p className='text-secondary-foreground text-sm md:text-lg'>
						Our products are carefully selected by our dental experts to ensure
						effectiveness, safety, and value for our patients. Whether
						you&apos;re looking to maintain your daily oral care routine or
						address specific dental concerns, our product line has you covered.
						Explore our selection and take the first step towards optimal dental
						health today!
					</p>
				</div>
				<div className='flex flex-wrap'>
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
						className='w-96 ml-auto'
						value={searchInput}
						onChange={handleChangeSearchInput}
					/>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4'>
					{isPendingGetProducts && !products.length
						? Array(5)
								.fill(0)
								.map((_, i) => {
									return <ProductCardSkeleton key={i} />
								})
						: null}

					{!isPendingGetProducts && products.length
						? products.map((product) => {
								return <ProductCard product={product} key={product.id} />
						  })
						: null}
				</div>

				{!isPendingGetProducts && products.length ? (
					<TablePagination
						pagination={pagination}
						total={productTotal}
						onChangePage={handleChangePage}
						onChangePageSize={handleChangePageSize}
					/>
				) : null}

				{!isPendingGetProducts && !products.length ? (
					<span className='text-center'>No products.</span>
				) : null}
			</div>
		</div>
	)
}
