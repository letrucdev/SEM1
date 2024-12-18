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
import { useUpdateDoctor } from '@/hooks/doctor/useUpdateDoctor'
import { formatDateForm, makeResourcePublicUrlFromPath } from '@/lib/utils'

/* export interface AddPromoFormRef {
  submit: () => void
}

interface AddPromoFormProps {
  userId: string
  onSuccess: () => void
} */

const formSchema = z
	.object({
		email: z.string().email().optional(),
		first_name: z
			.string({ required_error: 'First name is required' })
			.min(1, 'First name must be at least 1 character')
			.max(50, 'First name must be less than or equal to 50 characters')
			.optional(),
		last_name: z
			.string({ required_error: 'First name is required' })
			.min(1, 'Last name must be at least 1 character')
			.max(50, 'Last name must be less than or equal to 50 characters')
			.optional(),
		birthdate: z.string({ required_error: 'Birthdate is required' }).optional(),
		education: z.string({ required_error: 'Education is required' }).optional(),
		avatar: z
			.instanceof(File, { message: 'Avatar must be a file' })
			.optional()
			.refine(
				(file) => (file ? file.size <= 5000000 : true),
				`Max file size is 5MB.`
			)
			.refine(
				(file) =>
					file ? ['image/jpeg', 'image/png'].includes(file.type) : true,
				'Only .jpg, .png formats are supported.'
			),
	})
	.optional()

export const UpdateDentistForm = forwardRef(({ onSuccess, doctor }, ref) => {
	const { handleFormError } = useHandleFormError()
	const { updateDoctorMutateAsync } = useUpdateDoctor()
	const [avatarPreview, setAvatarPreview] = useState(null)

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: doctor.email,
			first_name: doctor.first_name,
			last_name: doctor.last_name,
			birthdate: formatDateForm(doctor.birthdate),
			education: doctor.education,
		},
	})

	const onSubmit = useCallback(
		async (values) => {
			try {
				await updateDoctorMutateAsync({ ...values, doctorId: doctor.id })
				onSuccess && onSuccess()
			} catch (error) {
				handleFormError(error, form)
			}
		},
		[doctor.id, form, handleFormError, onSuccess, updateDoctorMutateAsync]
	)

	const handleChangeAvatarInput = useCallback((event, field) => {
		const file = event.target?.files?.[0]
		if (file) {
			const objectUrl = URL.createObjectURL(file)
			field.onChange(file)
			setAvatarPreview(objectUrl)
		}
	}, [])

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

	useEffect(() => {
		return () => avatarPreview && URL.revokeObjectURL(avatarPreview)
	}, [avatarPreview])

	useEffect(() => {
		if (doctor.avatar_path) {
			setAvatarPreview(makeResourcePublicUrlFromPath(doctor.avatar_path))
		}
	}, [doctor.avatar_path])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='avatar'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Avatar</FormLabel>
							{avatarPreview && (
								<Card className='w-full max-h-96 h-96'>
									{
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={avatarPreview}
											alt='Dentist avatar'
											className='w-full h-full object-scale-down'
										/>
									}
								</Card>
							)}
							<FormControl>
								<Input
									type='file'
									accept='image/png, image/jpeg'
									onChange={(e) => handleChangeAvatarInput(e, field)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='m@example.com'
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
					name='first_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First name</FormLabel>
							<FormControl>
								<Input {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='last_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last name</FormLabel>
							<FormControl>
								<Input {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='education'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Education</FormLabel>
							<FormControl>
								<Input {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='birthdate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Brithdate</FormLabel>
							<FormControl>
								<Input type='date' {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
})

UpdateDentistForm.displayName = 'UpdateDentistForm'
