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
import { useGetProductCategories } from '@/hooks/product/useGetProductCategories'
import { useCreateProduct } from '@/hooks/product/useCreateProduct'
import { ImageUp, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png']

const formSchema = z
	.object({
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
			.min(1, 'At least one image is required'),
		price: z.string({ required_error: 'Product price is required' }),
		stock: z.string({ required_error: 'Product stock is required' }),
		product_category_id: z.string({
			required_error: 'Product category is required',
		}),
	})
	.required()

export const CreateProductForm = forwardRef(({ onSuccess }, ref) => {
	const { handleFormError } = useHandleFormError()
	const { createProductMutateAsync } = useCreateProduct()
	const { productCategories, isPendingGetProductCategories } =
		useGetProductCategories()

	const [previewImages, setPreviewImages] = useState([])

	const filesInputRef = useRef(null)

	const form = useForm({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = useCallback(
		async (values) => {
			try {
				await createProductMutateAsync(values)
				onSuccess && onSuccess()
			} catch (error) {
				handleFormError(error, form)
			}
		},
		[createProductMutateAsync, form, handleFormError, onSuccess]
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

	const handleRemoveImage = (field, image) => () => {
		setPreviewImages((prev) =>
			prev.filter((_image) => _image.url !== image.url)
		)
		field.onChange(field?.value.filter((file) => file.name !== image.name))
	}

	useEffect(() => {
		return () =>
			previewImages.forEach((image) => URL.revokeObjectURL(image.url))
	}, [previewImages])

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
							{previewImages.length > 0 && (
								<div className='grid grid-cols-3 gap-4'>
									{previewImages.map((image) => (
										<ProductPreviewImage
											key={image.name}
											src={image.url}
											value={field.value}
											onRemove={handleRemoveImage(field, image)}
										/>
									))}
								</div>
							)}
							<Button
								className='w-full'
								variant='outline'
								type='button'
								onClick={() => filesInputRef?.current.click()}
							>
								<ImageUp /> Upload Images
							</Button>
							<FormControl>
								<input
									hidden
									multiple
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

export const ProductPreviewImage = ({ src, onRemove, disabled }) => {
	return (
		<Card className='w-full h-32 overflow-hidden relative group'>
			<div
				className='w-full h-full absolute bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-destructive cursor-pointer'
				onClick={!disabled && onRemove}
			>
				<Trash />
			</div>
			{
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={src}
					alt={`Product image`}
					className='w-full h-full object-scale-down'
				/>
			}
		</Card>
	)
}

CreateProductForm.displayName = 'CreateDentistForm'
