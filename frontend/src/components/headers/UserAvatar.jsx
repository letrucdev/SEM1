import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	BriefcaseMedical,
	Lock,
	LogOut,
	Package,
	ReceiptText,
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

export const UserAvatar = ({
	user: { last_name, first_name, avatar, role },
}) => {
	const { logout } = useAuth()

	const makeAvatarFallbackFromName = ({ first_name, last_name }) => {
		return `${first_name.charAt(0).toUpperCase()}${last_name
			.charAt(0)
			.toUpperCase()}`
	}

	const additionalMenuItems = {
		role: {
			Admin: [
				{
					title: 'Manage users',
					href: '/manage-users',
					icon: <UsersIcon />,
				},
				{
					title: 'Manage dentists',
					href: '/manage-dentists',
					icon: <BriefcaseMedical />,
				},
				{
					title: 'Manage tickets',
					href: '/manage-tickets',
					icon: <ReceiptText />,
				},
				{
					title: 'Manage products',
					href: '/manage-products',
					icon: <Package />,
				},
			],
		},
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={avatar} alt='User avatar' />
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
							<span>Change password</span>
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
