'use client'
import { useAuth } from '@/contexts/AuthProvider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { useCallback } from 'react'

export default function ManageLayout({ children }) {
	const { user } = useAuth()
	const segment = useSelectedLayoutSegment()
	const router = useRouter()

	const manageRoutes = {
		Admin: [
			{ key: 'manage-users', tabLabel: 'Users', href: '/manage-users' },
			{
				key: 'manage-dentists',
				tabLabel: 'Dentists',
				href: '/manage-dentists',
			},
			{
				key: 'manage-products',
				tabLabel: 'Products',
				href: '/manage-products',
			},
			{ key: 'manage-orders', tabLabel: 'Orders', href: '/manage-orders' },
			{ key: 'manage-courses', tabLabel: 'Courses', href: '/manage-courses' },
			{ key: 'manage-posts', tabLabel: 'Posts', href: '/manage-posts' },
			{
				key: 'manage-tickets',
				tabLabel: 'Questions & Comments',
				href: '/manage-tickets',
			},
		],
		Doctor: [
			{ key: 'manage-courses', tabLabel: 'Courses', href: '/manage-courses' },
			{ key: 'manage-posts', tabLabel: 'Posts', href: '/manage-posts' },
		],
	}

	const handleRoute = useCallback(
		(href) => () => router.push(href, { scroll: false }),
		[router]
	)

	const renderTabsList = useCallback(
		(routes) => {
			return routes.map((route) => (
				<TabsTrigger
					key={route.key}
					value={route.key}
					onClick={handleRoute(route.href)}
				>
					{route.tabLabel}
				</TabsTrigger>
			))
		},
		[handleRoute]
	)

	if (!manageRoutes[user?.role]) {
		location.href = '/'
		return
	}

	return (
		<div className='flex flex-col w-full items-center'>
			<div className='container px-6 mt-6'>
				<div className='flex flex-col'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4 text-balance'>
						Dashboard
					</h2>
				</div>
				<Tabs value={segment} className='w-full'>
					<TabsList className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 justify-start h-fit gap-2'>
						{renderTabsList(manageRoutes[user?.role])}
					</TabsList>
				</Tabs>
			</div>

			{children}
		</div>
	)
}
