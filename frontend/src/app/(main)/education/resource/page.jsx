'use client'

import { PostCard } from '@/components/cards/PostCard'
import { TablePagination } from '@/components/table/Pagination'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_PAGINATION, POST_TYPE } from '@/constants'
import { useGetPosts } from '@/hooks/post/useGetPosts'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ResourcePage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
	const [searchInput, setSearchInput] = useState('')
	const [filters, setFilters] = useState({
		search: null,
	})

	const { posts, postTotal, isPendingGetPosts } = useGetPosts({
		...pagination,
		...filters,
		postType: POST_TYPE.Resource,
	})

	const handleChangePage = (page) => {
		setPagination((prev) => ({ ...prev, page }))
	}

	const handleChangePageSize = (pageSize) => {
		setPagination((prev) => ({ ...prev, pageSize }))
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
		<div className='flex flex-col justify-between pt-6 pb-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href={'/'}>Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>Research</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Resources</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className='flex flex-wrap'>
					<Input
						placeholder='Enter title or description to search'
						className='w-96'
						value={searchInput}
						onChange={handleChangeSearchInput}
						disabled={isPendingGetPosts}
					/>
				</div>

				{!posts.length && !isPendingGetPosts && (
					<span className='text-center'>No data.</span>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{!posts.length && isPendingGetPosts && (
						<>
							<Skeleton className={'h-56'} />
							<Skeleton className={'h-56'} />
							<Skeleton className={'h-56'} />
							<Skeleton className={'h-56'} />
							<Skeleton className={'h-56'} />
							<Skeleton className={'h-56'} />
						</>
					)}

					{!!posts.length &&
						!isPendingGetPosts &&
						posts.map((post) => {
							return <PostCard post={post} key={post.id} />
						})}
				</div>

				{!!posts.length && !isPendingGetPosts && (
					<TablePagination
						onChangePage={handleChangePage}
						onChangePageSize={handleChangePageSize}
						pagination={pagination}
						total={postTotal}
					/>
				)}
			</div>
		</div>
	)
}
