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
import { useChangePassword } from '@/hooks/user/useChangePassword'

const formSchema = z
	.object({
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, 'Password must be at least 8 characters long'),

		new_password: z
			.string({ required_error: 'New password is required' })
			.min(8, 'New password must be at least 8 characters long'),
		new_password_confirmation: z
			.string({ required_error: 'Confirm new password is required' })
			.min(8, 'Confirm new password must be at least 8 characters long'),
	})
	.required()
	.refine((value) => value.new_password === value.new_password_confirmation, {
		message: 'Passwords do not match',
		path: ['new_password_confirmation'],
	})

export default function ChnagePasswordPage() {
	useCsrfToken()

	const { handleFormError } = useHandleFormError()
	const { isPendingChangePassword, changePasswordMutateAsync } =
		useChangePassword()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			new_password: '',
			new_password_confirmation: '',
		},
	})

	const { reset } = form

	async function onSubmit(values) {
		try {
			await changePasswordMutateAsync(values)
			reset()
		} catch (error) {
			handleFormError(error, form)
		}
	}
	return (
		<div className='flex flex-col xl:flex-row justify-between py-12 container mx-auto gap-3 md:gap-8 px-6'>
			{/* Left Section */}
			<div className='flex flex-col'>
				<div className='flex flex-col mb-3'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4'>
						Change password
					</h2>
					<p className='text-secondary-foreground text-sm md:text-lg'>
						Enter your current password and new password to change your
						password.
					</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current password</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='new_password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>New password</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='new_password_confirmation'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm new password</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							className='w-full'
							disabled={!form.formState.isDirty || isPendingChangePassword}
						>
							Change password
							{isPendingChangePassword && <Loader2 className='animate-spin' />}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
