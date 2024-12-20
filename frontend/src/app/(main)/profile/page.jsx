'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCsrfToken } from '@/hooks/auth/useCsrfToken'
import { useHandleFormError } from '@/hooks/form/useHandleFormError'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useUpdateMe } from '@/hooks/user/useUpdateMe'
import { useAuth } from '@/contexts/AuthProvider'
import { formatDateForm } from '@/lib/utils'
import { useEffect } from 'react'

const formSchema = z
	.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email(),
		first_name: z
			.string({ required_error: 'First name is required' })
			.min(1, 'First name must be at least 1 character')
			.max(50, 'First name must be less than or equal to 50 characters'),
		last_name: z
			.string({ required_error: 'First name is required' })
			.min(1, 'Last name must be at least 1 character')
			.max(50, 'Last name must be less than or equal to 50 characters'),
		birthdate: z.string({ required_error: 'Birthdate is required' }),
	})
	.required()

export default function ProfilePage() {
	useCsrfToken()

	const { user } = useAuth()
	const { handleFormError } = useHandleFormError()
	const { isPendingUpdateMe, updateMeMutateAsync } = useUpdateMe()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			first_name: '',
			last_name: '',
			birthdate: '',
		},
	})

	const { reset } = form

	useEffect(() => {
		if (!user) return

		reset({
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			birthdate: formatDateForm(user.birthdate),
		})
	}, [user, reset])

	async function onSubmit(values) {
		try {
			await updateMeMutateAsync(values)
		} catch (error) {
			handleFormError(error, form)
		} finally {
			reset(values)
		}
	}
	return (
		<div className='flex flex-col xl:flex-row justify-between py-12 container mx-auto gap-3 md:gap-8 px-6'>
			{/* Left Section */}
			<div className='flex flex-col w-full'>
				<div className='flex flex-col mb-3'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4'>Profile</h2>
					<p className='text-secondary-foreground text-sm md:text-lg'>
						You can change your profile information here.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8 lg:w-1/2'
					>
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
										<Input {...field} />
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
										<Input {...field} />
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
										<Input type='date' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							className='w-full'
							disabled={!form.formState.isDirty || isPendingUpdateMe}
						>
							Save
							{isPendingUpdateMe && <Loader2 className='animate-spin' />}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
