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
import { useCreateDoctor } from '@/hooks/doctor/useCreateDoctor'
import { useHandleFormError } from '@/hooks/form/useHandleFormError'
import { Card } from '@/components/ui/card'

/* export interface AddPromoFormRef {
  submit: () => void
}

interface AddPromoFormProps {
  userId: string
  onSuccess: () => void
} */

const formSchema = z
	.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email(),
		avatar: z
			.instanceof(File, { message: 'Avatar must be a file' })
			.refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
			.refine(
				(file) => ['image/jpeg', 'image/png'].includes(file.type),
				'Only .jpg, .png formats are supported.'
			),
		password: z.string({ required_error: 'Password is required' }).min(8),
		password_confirmation: z
			.string({ required_error: 'Confirm password is required' })
			.min(8),
		first_name: z
			.string({ required_error: 'First name is required' })
			.min(1, 'First name must be at least 1 character')
			.max(50, 'First name must be less than or equal to 50 characters'),
		last_name: z
			.string({ required_error: 'First name is required' })
			.min(1, 'Last name must be at least 1 character')
			.max(50, 'Last name must be less than or equal to 50 characters'),
		birthdate: z.string({ required_error: 'Birthdate is required' }),
		education: z.string({ required_error: 'Education is required' }),
	})
	.required()
	.refine((value) => value.password === value.password_confirmation, {
		message: 'Passwords do not match',
		path: ['password_confirmation'],
	})

export const CreateDentistForm = forwardRef(({ onSuccess }, ref) => {
	const { handleFormError } = useHandleFormError()
	const { createDoctorMutateAsync } = useCreateDoctor()
	const [avatarPreview, setAvatarPreview] = useState(null)

	const form = useForm({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = useCallback(
		async (values) => {
			try {
				await createDoctorMutateAsync(values)
				onSuccess && onSuccess()
			} catch (error) {
				handleFormError(error, form)
			}
		},
		[createDoctorMutateAsync, form, handleFormError, onSuccess]
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

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password_confirmation'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confrim password</FormLabel>
							<FormControl>
								<Input type='password' {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
})

CreateDentistForm.displayName = 'CreateDentistForm'
