'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseLessonDetail } from '@/hooks/course/lesson/useGetCourseLessonDetail'
import { formatDateTime, makeResourcePublicUrlFromPath } from '@/lib/utils'

export default function CourseLessonPage({ params: { lessonId, id } }) {
	const { courseLesson, isPendingGetCourseLessonDetail } =
		useGetCourseLessonDetail({ courseId: id, lessonId })

	return (
		<div className='flex flex-col w-full gap-4 grow'>
			{!courseLesson && isPendingGetCourseLessonDetail && (
				<>
					<Skeleton
						className={'w-full h-[560px] max-h-full rounded-md overflow-hidden'}
					/>
					<span className='space-y-2'>
						<Skeleton className={'w-96 h-8'} />
						<Skeleton className={'w-72 h-8'} />
					</span>
					<Skeleton className={'w-full h-64'} />
				</>
			)}
			{courseLesson && !isPendingGetCourseLessonDetail && (
				<>
					<div className='grow h-fit max-h-[560px] rounded-md overflow-hidden shrink-0'>
						<video
							className='w-full aspect-video'
							src={makeResourcePublicUrlFromPath(courseLesson.video_path)}
							controls
						/>
					</div>
					<span>
						<p className='text-2xl font-semibold line-clamp-3'>
							{courseLesson?.title}
						</p>
						<p className='text-muted-foreground'>
							Last updated: {formatDateTime(courseLesson.updated_at)}
						</p>
					</span>
					<p className='leading-relaxed'>{courseLesson.content}</p>
				</>
			)}
		</div>
	)
}
