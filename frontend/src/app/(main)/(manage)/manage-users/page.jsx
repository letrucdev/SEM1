'use client'
import { DataTable } from '@/components/table/DataTable'
import { DEFAULT_PAGINATION } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useGetUsers } from '@/hooks/user/useGetUsers'

export default function ManageUsersPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

	const [filters, setFilters] = useState({
		search: null,
	})

	const [searchInput, setSearchInput] = useState('')

	const { users, userTotal } = useGetUsers({
		...pagination,
		...filters,
	})

	const columns = useMemo(
		() => [
			{
				key: 'order',
				title: '#',
				minWidth: 75,
			},
			{
				key: 'email',
				title: 'Email',
				minWidth: 200,
			},
			{
				key: 'first_name',
				title: 'First Name',
				minWidth: 200,
			},
			{
				key: 'last_name',
				title: 'Last Name',
				minWidth: 200,
			},
			{
				key: 'birthdate',
				title: 'Birthdate',
				minWidth: 200,
			},
			{
				key: 'created_at',
				title: 'Created At',
				minWidth: 200,
			},
		],
		[]
	)

	const rows = useMemo(
		() =>
			users?.map((user, index) => {
				return {
					...user,
					birthdate: formatDateTime(user.birthdate),
					created_at: formatDateTime(user.created_at, true),
				}
			}),
		[users]
	)

	const handleSetPage = (page) => {
		setPagination({ ...pagination, page })
	}

	const handleSetPageSize = (pageSize) => {
		setPagination({ page: 0, pageSize })
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
					<Input
						placeholder='Enter user name or email to search'
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
					total={userTotal}
				/>
			</div>
		</div>
	)
}