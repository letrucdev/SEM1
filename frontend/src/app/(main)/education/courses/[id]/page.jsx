'use client'
import { useGetCourseDetail } from '@/hooks/course/useGetCourseDetail'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CourseDetailDefaultPage({ params: { id } }) {
	const { course } = useGetCourseDetail(id)

	const router = useRouter()

	useEffect(() => {
		course &&
			router.push(`/education/courses/${id}/${course.course_lessons?.[0].id}`)
	}, [course, id, router])

	return <></>
}
