'use client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseDetail } from '@/hooks/course/useGetCourseDetail'
import { cn } from '@/lib/utils'
import { PlayCircle } from 'lucide-react'
import Link from 'next/link'
import {
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from 'next/navigation'

export default function CourseDetailLayout({
	children,
	params: { id, lessonId },
}) {
	const { course, isPendingGetCourseDetail } = useGetCourseDetail(id)

	const selectedLesson = useSelectedLayoutSegment()

	return (
		<div className='flex flex-col xl:flex-row justify-between pt-6 pb-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				{!isPendingGetCourseDetail && course && (
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
								<BreadcrumbLink href='/education/courses'>
									Courses
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{course.title}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				)}
				{isPendingGetCourseDetail && !course && (
					<Skeleton className={'w-80 h-5'} />
				)}

				<div className='flex flex-col lg:flex-row gap-8'>
					<div className='grow'>{children}</div>
					{/* Sidebar */}
					<div className='flex flex-col lg:w-[450px] w-full gap-3 shrink-0'>
						<h3 className='text-xl mb-2 font-semibold'>Course Lessons</h3>
						<ScrollArea className='max-h-[720px]'>
							<div className='flex flex-col gap-y-3'>
								{!course && isPendingGetCourseDetail && (
									<>
										<Skeleton className={`w-full h-16 py-2`} />
										<Skeleton className={`w-full h-16 py-2`} />
										<Skeleton className={`w-full h-16 py-2`} />
										<Skeleton className={`w-full h-16 py-2`} />
										<Skeleton className={`w-full h-16 py-2`} />
									</>
								)}
								{course?.course_lessons?.map((lesson, index) => (
									<Link
										key={lesson.id}
										href={`/education/courses/${course.id}/${lesson.id}`}
									>
										<Card
											className={cn(
												'hover:bg-muted transition-all',
												selectedLesson === lesson.id && 'bg-muted'
											)}
										>
											<CardHeader className='py-2 px-4'>
												<CardTitle className='text-lg'>
													{index + 1}. {lesson.title}
												</CardTitle>
												<CardDescription>
													<span className='flex items-center gap-2'>
														<PlayCircle size={16} /> {lesson.duration}
													</span>
												</CardDescription>
											</CardHeader>
										</Card>
									</Link>
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
			</div>
		</div>
	)
}
