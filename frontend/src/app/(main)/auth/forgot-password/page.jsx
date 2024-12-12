'use client'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForgotPassword } from '@/hooks/auth/useForgotPassword'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useHandleFormError } from '@/hooks/form/useHandleFormError'
import { z } from 'zod'
import React from 'react'
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
	})
	.required()

export default function ForgotPasswordPage() {
	useCsrfToken()

	const [isSentEmail, setIsSentEmail] = React.useState(false)

	const { handleFormError } = useHandleFormError()

	const { forgotPasswordMutateAsync, isPendingForgotPassword } =
		useForgotPassword()

	const form = useForm({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values) {
		try {
			await forgotPasswordMutateAsync(values)
			setIsSentEmail(true)
		} catch (error) {
			handleFormError(error, form)
		}
	}

	return (
		<Card className='w-[450px] h-fit'>
			<CardHeader>
				<CardTitle className='text-2xl'>Forgot password</CardTitle>
				<CardDescription>
					Enter your email below to recovery your password
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
											value={field.value ?? ''}
											disabled={isSentEmail}
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{isSentEmail &&
											'Check your email and click the link to reset your password.'}
									</FormDescription>
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							className='w-full'
							disabled={isPendingForgotPassword || isSentEmail}
						>
							Send recovery email
							{isPendingForgotPassword && <Loader2 className='animate-spin' />}
						</Button>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an issue?{' '}
					<Link href='/auth/sign-in' className='underline'>
						Sign In
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
