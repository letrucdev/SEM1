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
import { Card } from '@/components/ui/card'
import { useCreateCourse } from '@/hooks/course/useCreateCourse'
import { Textarea } from '@/components/ui/textarea'

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png']

const formSchema = z
	.object({
		title: z.string({
			required_error: 'Course title is required',
		}),
		description: z.string({
			required_error: 'Course description is required',
		}),
		thumbnail: z
			.instanceof(File, { message: 'Thumbnail must be a file' })
			.refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
			.refine(
				(file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
				'Only .jpg, .png formats are supported.'
			),
	})
	.required()

export const CreateCourseForm = forwardRef(({ onSuccess }, ref) => {
	const { handleFormError } = useHandleFormError()
	const { createCourseMutateAsync } = useCreateCourse()

	const [previewThumbnail, setPreviewThumbnail] = useState(null)

	const form = useForm({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = useCallback(
		async (values) => {
			try {
				await createCourseMutateAsync(values)
				onSuccess && onSuccess()
			} catch (error) {
				handleFormError(error, form)
			}
		},
		[createCourseMutateAsync, form, handleFormError, onSuccess]
	)

	const handleChangeThumbnailInput = useCallback((event, field) => {
		const file = event.target?.files?.[0]
		if (file) {
			const objectUrl = URL.createObjectURL(file)
			field.onChange(file)
			setPreviewThumbnail(objectUrl)
		}
	}, [])

	useEffect(() => {
		return () => previewThumbnail && URL.revokeObjectURL(previewThumbnail)
	}, [previewThumbnail])

	useImperativeHandle(
		ref,
		() => {
			return {
				submit() {
					form.handleSubmit(onSubmit)()
				},
			}
		},
		[form, onSubmit]
	)

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
								<Input {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='thumbnail'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thumbnail</FormLabel>
							{previewThumbnail && (
								<Card className='w-full max-h-96 h-96'>
									{
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={previewThumbnail}
											alt='Thumbnail'
											className='w-full h-full object-scale-down'
										/>
									}
								</Card>
							)}
							<FormControl>
								<Input
									type='file'
									accept='image/png, image/jpeg'
									onChange={(e) => handleChangeThumbnailInput(e, field)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
})

CreateCourseForm.displayName = 'CreateCourseForm'
