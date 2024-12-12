'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useAuth } from '@/contexts/AuthProvider'
import { UserAvatar } from './UserAvatar'
export const AuthHeader = () => {
	const { user } = useAuth()

	return (
		<div className='flex gap-2 ml-auto'>
			{!user && (
				<>
					<Button asChild variant='outline' className='px-6'>
						<Link href='/auth/sign-up'>Sign up</Link>
					</Button>
					<Button asChild className='px-6'>
						<Link href='/auth/sign-in'>Sign in</Link>
					</Button>
				</>
			)}
			{user && <UserAvatar user={user} />}
		</div>
	)
}
