'use client'

import { CourseCard } from '@/components/cards/CourseCard'
import { CourseCardSkeleton } from '@/components/cards/CourseCardSkeleton'
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
import { DEFAULT_PAGINATION } from '@/constants'
import { useGetCourses } from '@/hooks/course/useGetCourses'
import { useEffect, useState } from 'react'

export default function CoursesPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

	const [filters, setFilters] = useState({
		search: null,
	})

	const [searchInput, setSearchInput] = useState('')

	const { courseTotal, courses, isPendingGetCourses } = useGetCourses({
		...pagination,
		...filters,
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
							<BreadcrumbLink href='/'>Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>Education</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage href='/education/courses'>Courses</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className='flex flex-col mb-3'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4 text-balance'>
						Courses
					</h2>
					<p className='text-secondary-foreground text-sm md:text-lg'>
						Explore our comprehensive range of dental education courses designed
						to enhance your knowledge and skills in oral healthcare. Whether
						you&apos;re a dental professional looking to expand your expertise
						or a patient seeking to deepen your understanding of dental health,
						our courses offer valuable insights and practical information. From
						basic oral hygiene techniques to advanced dental procedures, our
						expert-led courses cover a wide spectrum of topics to support your
						learning journey in dentistry.
					</p>
				</div>

				<div className='flex'>
					<Input
						placeholder='Enter course title or description to search'
						className='w-96 md:ml-auto'
						value={searchInput}
						onChange={handleChangeSearchInput}
					/>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
					{isPendingGetCourses && !courses.length
						? Array(4)
								.fill(0)
								.map((_, i) => {
									return <CourseCardSkeleton key={i} />
								})
						: null}

					{!isPendingGetCourses && courses.length
						? courses.map((course) => {
								return <CourseCard course={course} key={course.id} />
						  })
						: null}
				</div>

				{!isPendingGetCourses && courses.length ? (
					<TablePagination
						pagination={pagination}
						total={courseTotal}
						onChangePage={handleChangePage}
						onChangePageSize={handleChangePageSize}
					/>
				) : null}

				{!isPendingGetCourses && !courses.length ? (
					<span className='text-center'>No products.</span>
				) : null}
			</div>
		</div>
	)
}
