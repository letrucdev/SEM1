'use client'
import Image from 'next/image'
import blogBanner3 from '@/public/blog3.jpg'
import { useGetDoctors } from '@/hooks/doctor/useGetDoctors'
import { DentistCard } from '@/components/cards/DentistCard'
import { getDoctorDefaultParams } from '@/hooks/doctor/useGetDoctors'
import { TablePagination } from '@/components/table/Pagination'
import { DEFAULT_PAGINATION } from '@/constants'
import React from 'react'
import { DentistCardSkeleton } from '@/components/cards/DentistCardSkeleton'

export default function DentistsPage() {
	const [pagination, setPagination] = React.useState(DEFAULT_PAGINATION)

	const { doctors, doctorTotal, isPendingGetDoctors } = useGetDoctors({
		...getDoctorDefaultParams,
		...pagination,
	})

	const handleChangePage = (page) => {
		setPagination((prev) => ({ ...prev, page }))
	}

	const handleChangePageSize = (pageSize) => {
		setPagination((prev) => ({ ...prev, pageSize }))
	}
	return (
		<div className='flex flex-col gap-11 w-full container mx-auto pb-12'>
			<div className='relative flex items-center justify-center overflow-hidden w-full h-[600px] mt-6 px-6'>
				<div className='container w-full h-full flex items-center z-20 relative rounded-md overflow-hidden'>
					<div className='absolute w-full h-full from-black/90 bg-gradient-to-r z-10 flex items-center px-6 md:px-24'>
						<div className='md:max-w-[580px] max-w-full text-background'>
							<h1 className='text-4xl md:text-6xl font-bold leading-tight mb-3'>
								Our dentist at Belleville Dental Care
							</h1>
							<p className='text-sm md:text-lg'>
								Meet our team of highly skilled and compassionate dentists
								dedicated to providing exceptional oral care. With years of
								experience and a commitment to staying at the forefront of
								dental technology, our professionals ensure that you receive the
								best possible treatment in a comfortable and friendly
								environment.
							</p>
						</div>
					</div>
					<Image
						src={blogBanner3}
						alt='Banner Home'
						className='w-full h-full object-cover absolute'
						priority
					/>
				</div>
			</div>

			<div className='flex flex-col pt-12 container mx-auto gap-3 md:gap-8 px-6'>
				<div className='flex flex-col'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4'>
						At Belleville Dental Care, we’re happiest when we’re working.
					</h2>
					<p className='text-secondary-foreground text-sm md:text-lg'>
						Belleville Dental Care is a lively place. When you visit our dentist
						and dental team in Belleville, we want you to have a good time.
					</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{!doctors.length && isPendingGetDoctors
						? Array(4)
								.fill(0)
								.map((_, i) => <DentistCardSkeleton key={i} />)
						: null}

					{doctors.length && !isPendingGetDoctors
						? doctors.map((dentist, index) => (
								<DentistCard dentist={dentist} key={index} />
						  ))
						: null}
				</div>

				{doctors.length && !isPendingGetDoctors ? (
					<TablePagination
						pagination={pagination}
						total={doctorTotal}
						onChangePage={handleChangePage}
						onChangePageSize={handleChangePageSize}
					/>
				) : null}

				{!doctors.length && !isPendingGetDoctors ? (
					<span className='text-center'>No dentists.</span>
				) : null}
			</div>
		</div>
	)
}
