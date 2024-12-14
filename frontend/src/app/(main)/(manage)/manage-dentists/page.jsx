'use client'
import { DataTable } from '@/components/table/DataTable'
import { DEFAULT_PAGINATION } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useGetDoctors } from '@/hooks/doctor/useGetDoctors'
import { CreateDentistDialog } from '@/components/dialog/dentist/CreateDentistDialog'
import { UpdateDentistDialog } from '@/components/dialog/dentist/UpdateDentistDialog'
import { DeleteDentistDialog } from '@/components/dialog/dentist/DeleteDentistDialog'

export default function ManageDentistsPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

	const [filters, setFilters] = useState({
		search: '',
	})

	const [searchInput, setSearchInput] = useState('')

	const { doctorTotal, doctors, isPendingGetDoctors } = useGetDoctors({
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
			{
				key: 'updated_at',
				title: 'Updated At',
				minWidth: 200,
			},
			{
				key: 'action',
				title: 'Action',
				minWidth: 200,
			},
		],
		[]
	)

	const rows = useMemo(
		() =>
			doctors?.map((doctor) => {
				return {
					...doctor,
					birthdate: formatDateTime(doctor.birthdate),
					created_at: formatDateTime(doctor.created_at, true),
					updated_at: formatDateTime(doctor.updated_at, true),
					action: (
						<span className='flex gap-2'>
							<UpdateDentistDialog doctor={doctor} />
							<DeleteDentistDialog doctorId={doctor.id} />
						</span>
					),
				}
			}),
		[doctors]
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
					<CreateDentistDialog
						disabled={isPendingGetDoctors}
						buttonTriggerClassName={'mr-auto'}
					/>
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
					total={doctorTotal}
				/>
			</div>
		</div>
	)
}
