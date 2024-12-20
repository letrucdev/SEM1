'use client'
import { DataTable } from '@/components/table/DataTable'
import { DEFAULT_PAGINATION } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useGetDoctors } from '@/hooks/doctor/useGetDoctors'
import { useGetTickets } from '@/hooks/contact/useGetTickets'

export default function ManageTicketsPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

	const [filters, setFilters] = useState({
		search: null,
	})

	const [searchInput, setSearchInput] = useState('')

	const { isPendingGetTickets, ticketTotal, tickets } = useGetTickets({
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
				key: 'contact_email',
				title: 'Contact Email',
				minWidth: 200,
			},
			{
				key: 'contact_phone',
				title: 'Contact Phone',
				minWidth: 200,
			},
			{
				key: 'subject',
				title: 'Subject',
				minWidth: 200,
			},
			{
				key: 'message',
				title: 'Message',
				minWidth: 250,
			},

			{
				key: 'created_at',
				title: 'Created At',
				minWidth: 250,
			},
		],
		[]
	)

	const rows = useMemo(
		() =>
			tickets?.map((ticket) => {
				return {
					...ticket,
					created_at: formatDateTime(ticket.created_at, true),
				}
			}),
		[tickets]
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
					total={ticketTotal}
				/>
			</div>
		</div>
	)
}
