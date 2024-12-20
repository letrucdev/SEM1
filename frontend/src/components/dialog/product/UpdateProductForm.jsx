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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGetProductCategories } from '@/hooks/product/useGetProductCategories'
import { useUpdateProduct } from '@/hooks/product/useUpdateProduct'
import { makeResourcePublicUrlFromPath } from '@/lib/utils'
import { ProductPreviewImage } from './CreateProductForm'
import { Button } from '@/components/ui/button'
import { ImageUp } from 'lucide-react'
import { useDeleteProductImage } from '@/hooks/product/useDeleteProductImage'

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png']

const formSchema = z.object({
	name: z.string({
		required_error: 'Product name is required',
	}),
	images: z
		.array(
			z

				.instanceof(File, { message: 'Image must be a file' })
				.refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
				.refine(
					(file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
					'Only .jpg, .png formats are supported.'
				),
			{ required_error: 'At least one image is required' }
		)
		.optional(),
	price: z
		.string({ required_error: 'Product price is required' })
		.or(z.number({ required_error: 'Product price is required' }))
		.optional(),
	stock: z
		.string({ required_error: 'Product stock is required' })
		.or(z.number({ required_error: 'Product stock is required' }))
		.optional(),
	product_category_id: z
		.string({
			required_error: 'Product category is required',
		})
		.optional(),
})

export const UpdateProductForm = forwardRef(({ onSuccess, product }, ref) => {
	const { handleFormError } = useHandleFormError()
	const { updateProductMutateAsync } = useUpdateProduct()
	const { deleteProductImageMutateAsync, isPendingDeleteProductImage } =
		useDeleteProductImage()
	const { productCategories, isPendingGetProductCategories } =
		useGetProductCategories()

	const [previewImages, setPreviewImages] = useState([])
	const [currentImages, setCurrentImages] = useState([])

	const filesInputRef = useRef(null)

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: product.name,
			price: product.price,
			stock: product.stock,
			product_category_id: product.product_category.id,
		},
	})

	const onSubmit = useCallback(
		async (values) => {
			try {
				await updateProductMutateAsync({ ...values, productId: product.id })
				onSuccess && onSuccess()
			} catch (error) {
				handleFormError(error, form)
			}
		},
		[form, handleFormError, onSuccess, product.id, updateProductMutateAsync]
	)

	const handleChangeImagesInput = useCallback(
		(event, field) => {
			const files = event.target.files || []
			if (files.length === 0) return

			const existingFiles = form.getValues().images || []
			const existingFileNames = existingFiles.map((file) => file.name)

			const newFiles = Array.from(files).filter(
				(file) => !existingFileNames.includes(file.name)
			)

			const filesValue = [...existingFiles, ...newFiles]

			const previewImages = filesValue.map((file) => {
				return {
					url: URL.createObjectURL(file),
					name: file.name,
				}
			})

			field.onChange(filesValue)

			setPreviewImages(previewImages)
		},
		[form]
	)

	const handleRemoveImage = useCallback(
		(field, image, isPreview = false) =>
			async () => {
				if (isPreview) {
					setPreviewImages((prev) =>
						prev.filter((_image) => _image.url !== image.url)
					)
					field.onChange(
						field?.value.filter((file) => file.name !== image.name)
					)
				} else {
					await deleteProductImageMutateAsync({
						productId: product.id,
						imageId: image.id,
					})
					setCurrentImages((prev) =>
						prev.filter((_image) => _image.id !== image.id)
					)
				}
			},
		[deleteProductImageMutateAsync, product.id]
	)

	useEffect(() => {
		return () => previewImages.forEach((url) => URL.revokeObjectURL(url))
	}, [previewImages])

	useEffect(() => {
		if (product.product_images) {
			setCurrentImages(
				product.product_images.map((image) => {
					return {
						...image,
						image_path: makeResourcePublicUrlFromPath(image.image_path),
					}
				})
			)
		}
	}, [product.product_images])

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
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='stock'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Stock</FormLabel>
							<FormControl>
								<Input
									min={0}
									type='number'
									{...field}
									value={field.value ?? ''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='product_category_id'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								disabled={isPendingGetProductCategories}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={'Choose product category'} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{productCategories?.map((category) => (
										<SelectItem value={category.id} key={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='images'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Images</FormLabel>
							<div className='grid grid-cols-3 gap-2'>
								{currentImages.length > 0 &&
									currentImages.map((image) => (
										<ProductPreviewImage
											src={image.image_path}
											key={image.id}
											onRemove={handleRemoveImage(field, image)}
											disabled={isPendingDeleteProductImage}
										/>
									))}

								{previewImages.length > 0 &&
									previewImages.map((image) => (
										<ProductPreviewImage
											src={image.url}
											key={image.name}
											onRemove={handleRemoveImage(field, image, true)}
										/>
									))}
							</div>
							<Button
								className='w-full'
								variant='outline'
								type='button'
								disabled={isPendingDeleteProductImage}
								onClick={() => filesInputRef?.current.click()}
							>
								<ImageUp /> Upload Images
							</Button>
							<FormControl>
								<input
									hidden
									multiple
									disabled={isPendingDeleteProductImage}
									ref={filesInputRef}
									type='file'
									accept='image/png, image/jpeg'
									value={''}
									onChange={(e) => handleChangeImagesInput(e, field)}
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

UpdateProductForm.displayName = 'UpdateProductForm'
