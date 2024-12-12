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
import { useRegister } from '@/hooks/auth/useRegister'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const formSchema = z
	.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email(),
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
	})
	.required()
	.refine((value) => value.password === value.password_confirmation, {
		message: 'Passwords do not match',
		path: ['password_confirmation'],
	})

export default function SignUpPage() {
	useCsrfToken()

	const { handleFormError } = useHandleFormError()
	const { isPendingRegister, mutateRegisterAsync } = useRegister()

	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values) {
		try {
			await mutateRegisterAsync(values)
			router.push('/auth/sign-in')
		} catch (error) {
			handleFormError(error, form)
		}
	}

	return (
		<Card className='w-[450px] h-fit'>
			<CardHeader>
				<CardTitle className='text-2xl'>Sign Up</CardTitle>
				<CardDescription>
					Enter your information below to sign up account
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
									<FormLabel>Confrim password</FormLabel>
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
							disabled={isPendingRegister}
						>
							Sign Up
							{isPendingRegister && <Loader2 className='animate-spin' />}
						</Button>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Have an account?{' '}
					<Link href='/auth/sign-in' className='underline'>
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
