'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useAuth } from '@/contexts/AuthProvider'
import { UserAvatar } from './UserAvatar'
import { ShoppingBasket } from 'lucide-react'
import { formatBigNumber } from '@/lib/utils'
import { useGetCart } from '@/hooks/cart/useGetCart'
export const AuthHeader = () => {
	const { user } = useAuth()
	const { cart } = useGetCart()

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
			{user && (
				<span className='flex items-center gap-2'>
					<Link href={'/cart'}>
						<span className='flex relative mr-2'>
							<ShoppingBasket size={24} />
							{!!cart?.cart_products_count && (
								<span className='min-w-3 h-3 z-10 bg-primary rounded-full flex items-center justify-center px-1 py-2 text-xs text-background -ml-2'>
									{formatBigNumber(cart.cart_products_count)}
								</span>
							)}
						</span>
					</Link>
					<UserAvatar user={user} />
				</span>
			)}
		</div>
	)
}
