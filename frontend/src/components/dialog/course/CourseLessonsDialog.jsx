import { memo, useMemo, useRef } from 'react'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useGetCourseLessons } from '@/hooks/course/lesson/useGetCourseLessons'
import { DataTable } from '@/components/table/DataTable'
import { CreateCourseLessonDialog } from './CreateCourseLessonDialog'
import { formatDateTime } from '@/lib/utils'
import { UpdateCourseLessonDialog } from './UpdateCourseLessonDialog'
import { DeleteCourseLessonDialog } from './DeleteCourseLessonDialog'

export const CourseLessonsDialog = memo(({ course }) => {
	const dialogRef = useRef(null)

	const { courseLessons, isPendingGetCourseLessons } = useGetCourseLessons({
		courseId: course.id,
	})

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
				minWidth: 200,
			},
			{
				key: 'content',
				title: 'Content',
				minWidth: 200,
			},
			{
				key: 'duration',
				title: 'Duration',
				minWidth: 150,
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
			courseLessons?.map((lesson) => {
				return {
					...lesson,
					title: <span className='line-clamp-3'>{lesson.title}</span>,
					content: <span className='line-clamp-3'>{lesson.content}</span>,
					created_at: formatDateTime(course.created_at, true),
					updated_at: formatDateTime(course.updated_at, true),
					action: (
						<span className='flex gap-2'>
							<UpdateCourseLessonDialog course={course} lesson={lesson} />
							<DeleteCourseLessonDialog course={course} lesson={lesson} />
						</span>
					),
				}
			}),
		[course, courseLessons]
	)

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={course.title}
			triggerElement={
				<Button variant='outline' className='w-full' type='button'>
					<Eye className='mr-2' /> View Lessons
				</Button>
			}
			content={
				<div className='space-y-4'>
					<CreateCourseLessonDialog
						course={course}
						disabled={isPendingGetCourseLessons}
					/>
					<DataTable columns={columns} rows={rows} isPaginated={false} />
				</div>
			}
			contentClassName='max-w-7xl max-h-[90%]'
		/>
	)
})

CourseLessonsDialog.displayName = 'CourseLessonsDialog'
