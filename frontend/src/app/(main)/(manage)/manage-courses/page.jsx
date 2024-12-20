'use client'

import { CreateCourseDialog } from '@/components/dialog/course/CreateCourseDialog'
import { DeleteCourseDialog } from '@/components/dialog/course/DeleteCourseDialog'
import { UpdateCourseDialog } from '@/components/dialog/course/UpdateCourseDialog'
import { DataTable } from '@/components/table/DataTable'
import { DEFAULT_PAGINATION } from '@/constants'
import { useAuth } from '@/contexts/AuthProvider'
import { useGetCourses } from '@/hooks/course/useGetCourses'
import { formatDateTime, makeResourcePublicUrlFromPath } from '@/lib/utils'
import Image from 'next/image'
import { useMemo, useState } from 'react'

export default function ManageCoursesPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
	const { courses, courseTotal, isPendingGetCourses } = useGetCourses()
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
				key: 'description',
				title: 'Description',
				minWidth: 250,
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
			courses?.map((course) => {
				return {
					...course,
					title: (
						<span className='flex items-center'>
							<Image
								width={128}
								height={128}
								src={makeResourcePublicUrlFromPath(course.thumbnail_path)}
								alt={course.title}
								className='w-16 h-16 object-scale-down rounded-md'
							/>
							<span className='ml-4 line-clamp-2'>{course.title}</span>
						</span>
					),
					description: (
						<span className='line-clamp-2'>{course.description}</span>
					),
					created_at: formatDateTime(course.created_at, true),
					updated_at: formatDateTime(course.updated_at, true),
					action: (user?.id === course.user_id || user?.role === 'Admin') && (
						<span className='flex gap-2'>
							<UpdateCourseDialog course={course} />
							<DeleteCourseDialog courseId={course.id} />
						</span>
					),
				}
			}),
		[courses, user?.id, user?.role]
	)

	const handleSetPage = (page) => {
		setPagination((prev) => ({ ...prev, page }))
	}

	const handleSetPageSize = (pageSize) => {
		setPagination((prev) => ({ ...prev, pageSize }))
	}

	return (
		<div className='flex flex-col xl:flex-row justify-between pt-4 pb-6 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				<div className='flex flex-wrap gap-3'>
					<CreateCourseDialog disabled={isPendingGetCourses} />
				</div>

				<DataTable
					columns={columns}
					handleSetPage={handleSetPage}
					handleSetPageSize={handleSetPageSize}
					pagination={pagination}
					rows={rows}
					total={courseTotal}
				/>
			</div>
		</div>
	)
}
