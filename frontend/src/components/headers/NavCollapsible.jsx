'use client'
import * as React from 'react'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { SheetClose } from '../ui/sheet'

export const NavCollapsible = ({ label, items }) => {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<div className='flex flex-col'>
				<CollapsibleTrigger asChild>
					<Button
						variant='ghost'
						className='justify-start font-semibold shrink-0'
					>
						{label}
						<ChevronDown
							className={`ml-auto transition-transform ${
								isOpen && '-rotate-180'
							}`}
						/>
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent className='flex flex-col'>
				{items.map((item) => (
					<SheetClose asChild key={item.title}>
						<Button asChild variant='ghost' className='justify-start'>
							<Link href={'#!'}>{item.title}</Link>
						</Button>
					</SheetClose>
				))}
			</CollapsibleContent>
		</Collapsible>
	)
}
