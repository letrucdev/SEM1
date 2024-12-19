import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { POST_TYPE } from '@/constants'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import { makeResourcePublicUrlFromPath } from '@/lib/utils'
import { useUpdatePost } from '@/hooks/post/useUpdatePost'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
})

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const MAX_FILE_SIZE = 10000000 // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png']

const formSchema = z
	.object({
		title: z.string().optional(),
		thumbnail: z
			.instanceof(File, { message: 'Thumbnail must be a file' })
			.optional()
			.refine(
				(file) => (file ? file.size <= MAX_FILE_SIZE : true),
				`Max file size is 10MB.`
			)
			.refine(
				(file) => (file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : true),
				'Only .jpg, .png formats are supported.'
			),
		content: z.string().optional(),
		description: z.string().optional(),
		postType: z.string().optional(),
	})
	.required()

export const UpdatePostForm = forwardRef(({ onSuccess, post }, ref) => {
	const { handleFormError } = useHandleFormError()
	const { updatePostMutateAsync } = useUpdatePost()

	const [thumbnailPreview, setThumbnailPreview] = useState(null)

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: post.title,
			thumbnail: post.thumbnail,
			content: post.content,
			description: post.description,
			postType: post.post_type,
		},
	})

	const onSubmit = useCallback(
		async (values) => {
			try {
				await updatePostMutateAsync({
					postId: post.id,
					...{ ...values, postType: POST_TYPE[values.postType] },
				})
				onSuccess && onSuccess()
			} catch (error) {
				handleFormError(error, form)
			}
		},
		[form, handleFormError, onSuccess, post.id, updatePostMutateAsync]
	)

	const handleChangeThumbnailInput = useCallback((event, field) => {
		const file = event.target?.files?.[0]
		if (file) {
			const objectUrl = URL.createObjectURL(file)
			field.onChange(file)
			setThumbnailPreview(objectUrl)
		}
	}, [])

	useEffect(() => {
		return () => thumbnailPreview && URL.revokeObjectURL(thumbnailPreview)
	}, [thumbnailPreview])

	useEffect(() => {
		if (post.thumbnail_path) {
			setThumbnailPreview(makeResourcePublicUrlFromPath(post.thumbnail_path))
		}
	}, [post.thumbnail_path])

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
					name='postType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Post Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={'Choose post type'} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.keys(POST_TYPE).map((type) => {
										return (
											<SelectItem value={type} key={type}>
												{type}
											</SelectItem>
										)
									})}
								</SelectContent>
							</Select>
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
							{thumbnailPreview && (
								<Card className='w-full max-h-96 h-96'>
									{
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={thumbnailPreview}
											alt='Thumbnail'
											className='w-full h-full object-cover rounded-md'
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

				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<div
									className='flex w-full gap-4 overflow-auto py-1 px-1'
									data-color-mode='light'
								>
									<MDEditor
										value={field.value ?? ''}
										onChange={field.onChange}
										className='shrink-0 grow h-full !rounded-md overflow-hidden w-full'
										highlightEnable
										previewOptions={{
											className: 'prose lg:prose-xl max-w-full prose-img:my-2',
											rehypePlugins: [[rehypeSanitize]],
										}}
										height={768}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
})

UpdatePostForm.displayName = 'UpdatePostForm'
