import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { LogoHeader } from './LogoHeader'
import { NavCollapsible } from './NavCollapsible'

const researchs = [
	{
		title: 'Documents',
		href: '/education/research-documents',
		description: 'Includes in-depth research papers on dental issues',
	},
	{
		title: 'Resource',
		href: '/education/resource',
		description:
			'Comprehensive collection of dental resources including latest research findings, educational materials, and professional guidelines. Access cutting-edge information from leading dental experts worldwide to enhance your knowledge and practice.',
	},
]

const educations = [
	{
		title: 'For patient',
		href: '/education/for-patient',
		description:
			'Educational content aimed at helping patients understand dental health topics, including oral hygiene, common dental procedures, and preventive care tips.',
	},
	{
		title: 'Profressional documents',
		href: '/education/profressional-documents',
		description:
			'Professional resources such as treatment guidelines, clinical manuals, or technical documents for use by dentists and oral healthcare specialists.',
	},
	{
		title: 'Courses',
		href: '/education/courses',
		description:
			'A collection of dental courses offered by our dental offices.',
	},
]

const NavHeader = () => {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='lg:hidden shrink-0'>
						<Menu />
					</Button>
				</SheetTrigger>

				<SheetContent>
					<SheetTitle className='hidden'></SheetTitle>
					<SheetDescription className='hidden'></SheetDescription>
					<SheetHeader className={'text-left'}>
						{/* <SheetTitle className='hidden'></SheetTitle>
						<SheetDescription className='hidden'></SheetDescription> */}
						{/* 	<SheetTitle></SheetTitle>
						<SheetDescription></SheetDescription> */}
						<LogoHeader />
					</SheetHeader>
					<div className='flex -mx-4 h-full overflow-hidden py-4'>
						<div className='flex flex-col grow overflow-auto pb-4'>
							<SheetClose asChild>
								<Button
									asChild
									variant='ghost'
									className='justify-start font-semibold shrink-0'
								>
									<Link href={'/'}>Home</Link>
								</Button>
							</SheetClose>

							<SheetClose asChild>
								<Button
									asChild
									variant='ghost'
									className='justify-start font-semibold shrink-0'
								>
									<Link href={'/dentists'}>Dentists</Link>
								</Button>
							</SheetClose>

							<SheetClose asChild>
								<Button
									asChild
									variant='ghost'
									className='justify-start font-semibold shrink-0'
								>
									<Link href={'/products'}>Products</Link>
								</Button>
							</SheetClose>

							<NavCollapsible items={researchs} label={'Research'} />
							<NavCollapsible items={educations} label={'Education'} />

							<SheetClose asChild>
								<Button
									asChild
									variant='ghost'
									className='justify-start font-semibold shrink-0'
								>
									<Link href={'/contact-us'}>Contact Us</Link>
								</Button>
							</SheetClose>
						</div>
					</div>
				</SheetContent>
			</Sheet>

			<NavigationMenu className='z-50 lg:block hidden ml-auto'>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link href='/' legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link href='/dentists' legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Dentists
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link href='/products' legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Products
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuTrigger>Research</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
								{researchs.map((research) => (
									<ListItem
										key={research.title}
										title={research.title}
										href={research.href}
									>
										{research.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuTrigger>Education</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
								{educations.map((education) => (
									<ListItem
										key={education.title}
										title={education.title}
										href={education.href}
									>
										{education.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link href='/contact-us' legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Contact Us
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</>
	)
}

const ListItem = React.forwardRef(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<Link
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className='text-sm font-semibold leading-none'>{title}</div>
						<p className='line-clamp-3 text-sm leading-snug text-muted-foreground'>
							{children}
						</p>
					</Link>
				</NavigationMenuLink>
			</li>
		)
	}
)

ListItem.displayName = 'ListItem'

export default NavHeader
