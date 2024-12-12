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
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useLogin } from '@/hooks/auth/useLogin'
import { Loader2 } from 'lucide-react'
import { useCsrfToken } from '@/hooks/auth/useCsrfToken'
import { useHandleFormError } from '@/hooks/form/useHandleFormError'
import { useRouter } from 'next/navigation'

const formSchema = z
	.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email(),
		password: z.string({ required_error: 'Password is required' }).min(8),
	})
	.required()

export default function SignInPage() {
	useCsrfToken()

	const { handleFormError } = useHandleFormError()
	const { isPendingLogin, mutateLoginAsync } = useLogin()

	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', password: '' },
	})

	async function onSubmit(values) {
		try {
			await mutateLoginAsync(values)
			router.push('/')
		} catch (error) {
			handleFormError(error, form)
		}
	}

	return (
		<Card className='w-[450px] h-fit'>
			<CardHeader>
				<CardTitle className='text-2xl'>Sign In</CardTitle>
				<CardDescription>
					Enter your email and password below to sign in to your account
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
									<div className='flex items-center'>
										<FormLabel>Password</FormLabel>
										<Link
											href='/auth/forgot-password'
											className='ml-auto inline-block text-sm underline'
										>
											Forgot your password?
										</Link>
									</div>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={isPendingLogin}>
							Sign In {isPendingLogin && <Loader2 className='animate-spin' />}
						</Button>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/auth/sign-up' className='underline'>
						Sign Up
					</Link>
				</div>
				{/* <div className='grid gap-4'>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
					</div>
					<div className='grid gap-2'>
						<div className='flex items-center'>
							<Label htmlFor='password'>Password</Label>
							<Link
								href='/auth/forgot-password'
								className='ml-auto inline-block text-sm underline'
							>
								Forgot your password?
							</Link>
						</div>
						<Input id='password' type='password' required />
					</div>
				</div> */}
			</CardContent>
		</Card>
	)
}
