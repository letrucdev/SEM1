import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	BriefcaseMedical,
	FileText,
	GraduationCap,
	Lock,
	LogOut,
	Package,
	ReceiptText,
	Truck,
	User,
	UsersIcon,
} from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthProvider'
import { makeResourcePublicUrlFromPath } from '@/lib/utils'

export const UserAvatar = ({
	user: { last_name, first_name, avatar_path, role },
}) => {
	const { logout } = useAuth()

	const makeAvatarFallbackFromName = ({ first_name, last_name }) => {
		return `${first_name?.charAt(0).toUpperCase()}${last_name
			?.charAt(0)
			.toUpperCase()}`
	}

	const additionalMenuItems = {
		role: {
			Admin: [
				{
					title: 'Manage Users',
					href: '/manage-users',
					icon: <UsersIcon />,
				},
				{
					title: 'Manage Dentists',
					href: '/manage-dentists',
					icon: <BriefcaseMedical />,
				},
				{
					title: 'Manage Tickets',
					href: '/manage-tickets',
					icon: <ReceiptText />,
				},
				{
					title: 'Manage Products',
					href: '/manage-products',
					icon: <Package />,
				},
				{
					title: 'Manage Courses',
					href: '/manage-courses',
					icon: <GraduationCap />,
				},
				{
					title: 'Manage Orders',
					href: '/manage-orders',
					icon: <Package />,
				},
				{
					title: 'Manage Posts',
					href: '/manage-posts',
					icon: <FileText />,
				},
			],
			Doctor: [
				{
					title: 'Manage Courses',
					href: '/manage-courses',
					icon: <GraduationCap />,
				},
				{
					title: 'Manage Posts',
					href: '/manage-posts',
					icon: <FileText />,
				},
			],
		},
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage
						src={makeResourcePublicUrlFromPath(avatar_path)}
						alt='User avatar'
					/>
					<AvatarFallback>
						{makeAvatarFallbackFromName({ first_name, last_name })}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end'>
				<DropdownMenuLabel>
					{last_name} {first_name}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link className='' href={'/profile'}>
							<User />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link className='' href={'/change-password'}>
							<Lock />
							<span>Change Password</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem asChild>
						<Link className='' href={'/orders'}>
							<Package />
							<span>My Orders</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				{additionalMenuItems.role[role] && (
					<>
						<DropdownMenuGroup>
							{additionalMenuItems.role[role].map((item) => {
								return (
									<DropdownMenuItem asChild key={item.title}>
										<Link href={item.href}>
											{item.icon} {item.title}
										</Link>
									</DropdownMenuItem>
								)
							})}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
					</>
				)}
				<DropdownMenuItem onClick={logout}>
					<LogOut />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
