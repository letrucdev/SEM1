import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useHandleFormError } from '@/hooks/form/useHandleFormError'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateCourseLesson } from '@/hooks/course/lesson/useUpdateCourseLesson'
import { makeResourcePublicUrlFromPath } from '@/lib/utils'

const MAX_FILE_SIZE = 1_000_000 * 100 // 100MB
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg']

const formSchema = z.object({
	title: z.string().optional(),
	content: z.string().optional(),
	duration: z.number().optional(),
	video: z
		.instanceof(File, { message: 'Video must be a file' })
		.optional()
		.refine(
			(file) => (file ? file.size <= MAX_FILE_SIZE : true),
			`Max file size is 100MB.`
		)
		.refine(
			(file) => (file ? ACCEPTED_VIDEO_TYPES.includes(file.type) : true),
			'Only .mp4, .webm, .ogg formats are supported.'
		),
})

export const UpdateCourseLessonForm = forwardRef(
	({ onSuccess, lesson, course }, ref) => {
		const { handleFormError } = useHandleFormError()
		const { updateCourseLessonMutateAsync } = useUpdateCourseLesson()
		const [videoPreview, setVideoPreview] = useState(null)

		const form = useForm({
			resolver: zodResolver(formSchema),
			defaultValues: {
				title: lesson.title,
				content: lesson.content,
				duration: lesson.duration,
			},
		})

		const onSubmit = useCallback(
			async (values) => {
				try {
					await updateCourseLessonMutateAsync({
						...values,
						courseId: course.id,
						lessonId: lesson.id,
					})
					onSuccess && onSuccess()
				} catch (error) {
					handleFormError(error, form)
				}
			},
			[
				updateCourseLessonMutateAsync,
				course.id,
				lesson.id,
				onSuccess,
				handleFormError,
				form,
			]
		)

		const handleVideoChange = (e) => {
			const file = e.target.files[0]
			if (!file) return

			const videoUrl = URL.createObjectURL(file)
			setVideoPreview(videoUrl)
			form.setValue('video', file)
		}

		useImperativeHandle(
			ref,
			() => ({
				submit() {
					form.handleSubmit(onSubmit)()
				},
			}),
			[form, onSubmit]
		)

		useEffect(() => {
			return () => videoPreview && URL.revokeObjectURL(videoPreview)
		}, [videoPreview])

		useEffect(() => {
			// Set initial video preview if lesson has a video
			if (lesson.video_path) {
				setVideoPreview(makeResourcePublicUrlFromPath(lesson.video_path))
			}
		}, [lesson.video_path])

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='content'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Content</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='duration'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Duration (seconds)</FormLabel>
								<FormControl>
									<Input
										min={1}
										type='number'
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='video'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Video</FormLabel>
								{videoPreview && (
									<div className='mt-4 rounded-md overflow-hidden w-full'>
										<video
											src={videoPreview}
											controls
											className='w-full max-w-full max-h-80'
										>
											Your browser does not support the video tag.
										</video>
									</div>
								)}
								<FormControl>
									<Input
										type='file'
										accept='video/mp4,video/webm,video/ogg'
										onChange={handleVideoChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		)
	}
)

UpdateCourseLessonForm.displayName = 'UpdateCourseLessonForm'
