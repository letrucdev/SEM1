'use client'

import { CreatePostDialog } from '@/components/dialog/post/CreatePostDialog'
import { DeletePostDialog } from '@/components/dialog/post/DeletePostDialog'
import { UpdatePostDialog } from '@/components/dialog/post/UpdatePostDialog'
import { DataTable } from '@/components/table/DataTable'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { DEFAULT_PAGINATION, POST_TYPE } from '@/constants'
import { useAuth } from '@/contexts/AuthProvider'
import { useGetPosts } from '@/hooks/post/useGetPosts'
import { formatDateTime } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'

export default function ManagePostsPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

	const [filters, setFilters] = useState({
		search: '',
		postType: '',
	})

	const [searchInput, setSearchInput] = useState('')

	const { posts, postTotal, isPendingGetPosts } = useGetPosts({
		...pagination,
		...filters,
	})

	const { user } = useAuth()

	const columns = useMemo(
		() => [
			{
				key: 'order',
				title: '#',
				minWidth: 65,
			},
			{
				key: 'title',
				title: 'Title',
				minWidth: 250,
			},
			{
				key: 'post_type',
				title: 'Post Type',
				minWidth: 250,
			},
			{
				key: 'description',
				title: 'Description',
				minWidth: 250,
			},
			{
				key: 'created_at',
				title: 'Created At',
				minWidth: 150,
			},
			{
				key: 'updated_at',
				title: 'Updated At',
				minWidth: 150,
			},
			{
				key: 'action',
				title: 'Action',
				minWidth: 150,
			},
		],
		[]
	)

	const rows = useMemo(
		() =>
			posts?.map((post) => {
				return {
					...post,
					created_at: formatDateTime(post.created_at, true),
					updated_at: formatDateTime(post.updated_at, true),
					action: (user?.id === post.user_id || user?.role === 'Admin') && (
						<span className='flex gap-2'>
							<UpdatePostDialog post={post} />
							<DeletePostDialog postId={post.id} />
							{/* <UpdateProductDialog product={product} />
							<DeleteProductDialog productId={product.id} /> */}
						</span>
					),
				}
			}),
		[posts, user?.id, user?.role]
	)

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
				<div className='flex flex-wrap gap-2'>
					<Select
						disabled={isPendingGetPosts}
						value={filters.postType}
						onValueChange={(value) => handleChangeFilter('postType', value)}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='All' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={null}>All</SelectItem>
							{Object.keys(POST_TYPE).map((type) => (
								<SelectItem value={POST_TYPE[type]} key={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Input
						placeholder='Enter post title to search'
						className='w-96 sm:ml-auto'
						value={searchInput}
						onChange={handleChangeSearchInput}
					/>
				</div>

				<div className='flex flex-wrap gap-3'>
					<CreatePostDialog disabled={isPendingGetPosts} />
				</div>

				<DataTable
					columns={columns}
					rows={rows}
					handleSetPage={handleSetPage}
					handleSetPageSize={handleSetPageSize}
					pagination={pagination}
					total={postTotal}
				/>
			</div>
		</div>
	)
}
