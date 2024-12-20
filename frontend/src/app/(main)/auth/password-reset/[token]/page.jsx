'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useResetPassword } from '@/hooks/auth/useResetPassword'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { useHandleFormError } from '@/hooks/form/useHandleFormError'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useCsrfToken } from '@/hooks/auth/useCsrfToken'

const formSchema = z
	.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email(),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, 'Password must be at least 8 characters long'),
		password_confirmation: z
			.string({
				required_error: 'Confirm password is required',
			})
			.min(8, 'Confirm password must be at least 8 characters long'),
	})
	.required()
	.refine((value) => value.password === value.password_confirmation, {
		message: 'Passwords do not match',
		path: ['password_confirmation'],
	})

export default function ResetPasswordPage({ params: { token } }) {
	useCsrfToken()

	const searchParmas = useSearchParams()
	const email = searchParmas.get('email')

	const { handleFormError } = useHandleFormError()
	const { isPendingResetPassword, resetPasswordMutateAsync } =
		useResetPassword()

	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: { email },
	})

	async function onSubmit(values) {
		try {
			await resetPasswordMutateAsync({ ...values, token })
			router.push('/auth/sign-in')
		} catch (error) {
			handleFormError(error, form)
		}
	}

	return (
		<Card className='w-[450px] h-fit'>
			<CardHeader>
				<CardTitle className='text-2xl'>Reset password</CardTitle>
				<CardDescription>
					Enter your new password below to reset your password
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
											disabled
										/>
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
									<FormLabel>New password</FormLabel>
									<FormControl>
										<Input
											type='password'
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
							name='password_confirmation'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input
											type='password'
											{...field}
											value={field.value ?? ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							className='w-full'
							disabled={isPendingResetPassword}
						>
							Reset password
							{isPendingResetPassword && <Loader2 className='animate-spin' />}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
