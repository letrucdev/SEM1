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
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { LogoHeader } from './LogoHeader'
import { NavCollapsible } from './NavCollapsible'

const researchs = [
	{
		title: 'Documents',
		href: '/posts/documents',
		description: 'Includes in-depth research papers on dental issues',
	},
	{
		title: 'Videos',
		href: '/posts/videos',
		description: 'Includes videos on dental care',
	},
	{
		title: 'Latest research',
		href: '/posts/lastest-research',
		description:
			'Includes the latest dental research from leading dentists around the world',
	},
]

const educations = [
	{
		title: 'Courses',
		href: '/education/courses',
		description:
			'A collection of dental courses offered by our dental offices.',
	},
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
		title: 'Case studies',
		href: '/education/case-studies',
		description:
			' In-depth analyses of real-life dental cases, showcasing challenges, treatment approaches, and outcomes. These studies provide valuable insights into advanced dental procedures, innovative solutions, and best practices for professionals and patients alike.',
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
					<SheetHeader className={'text-left'}>
						<LogoHeader />
					</SheetHeader>
					<div className='flex -mx-4 h-full overflow-hidden py-4'>
						<div className='flex flex-col grow overflow-auto pb-4'>
							<Button
								asChild
								variant='ghost'
								className='justify-start font-semibold shrink-0'
							>
								<Link href={'/'}>Home</Link>
							</Button>

							<Button
								asChild
								variant='ghost'
								className='justify-start font-semibold shrink-0'
							>
								<Link href={'/'}>Product</Link>
							</Button>

							<NavCollapsible items={researchs} label={'Research'} />
							<NavCollapsible items={educations} label={'Education'} />
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
						<Link href='/products' legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Product
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
