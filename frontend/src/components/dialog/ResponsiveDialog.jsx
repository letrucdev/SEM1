import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { useMediaQuery } from 'usehooks-ts'

export const ResponsiveDialog = forwardRef(
	(
		{
			open,
			onConfirm,
			onOpenChange,
			content,
			triggerElement,
			title,
			description,
			isPending,
			manualClose,
			confirmButtonText,
			cancelButtonText,
			disabled,
			contentClassName,
			isShowFooter = true,
		},
		ref
	) => {
		const [_open, setOpen] = useState(open)
		const isDesktop = useMediaQuery('(min-width: 768px)')

		const _description = description ?? ''

		const handleOpenChange = (open) => {
			setOpen(open)
			onOpenChange && onOpenChange(open)
		}

		const handleCloseDialog = () => {
			setOpen(false)
		}

		const handleConfirm = () => {
			if (!manualClose) handleCloseDialog()
			onConfirm && onConfirm()
		}

		useImperativeHandle(
			ref,
			() => {
				return {
					close() {
						handleCloseDialog()
					},
				}
			},
			[]
		)

		if (isDesktop) {
			return (
				<Dialog open={_open} onOpenChange={handleOpenChange}>
					{!disabled && (
						<DialogTrigger asChild>
							<span>{triggerElement}</span>
						</DialogTrigger>
					)}
					{disabled && triggerElement}

					<DialogContent className={contentClassName}>
						<DialogHeader>
							<DialogTitle className='text-balance'>{title}</DialogTitle>
							<DialogDescription>{_description}</DialogDescription>
						</DialogHeader>
						<div className='flex h-full overflow-hidden -mx-4'>
							<ScrollArea className='w-1 flex-1'>
								<div className='px-4 pb-2'>{content}</div>
							</ScrollArea>
						</div>

						{isShowFooter && (
							<DialogFooter>
								<Button
									variant='outline'
									onClick={handleCloseDialog}
									disabled={isPending}
								>
									{cancelButtonText ?? 'Cancel'}
								</Button>
								<Button onClick={handleConfirm} disabled={isPending}>
									{confirmButtonText ?? 'Confirm'}
								</Button>
							</DialogFooter>
						)}
					</DialogContent>
				</Dialog>
			)
		}

		return (
			<Drawer open={_open} onOpenChange={setOpen} noBodyStyles>
				{!disabled && (
					<DrawerTrigger asChild>
						<span>{triggerElement}</span>
					</DrawerTrigger>
				)}
				{disabled && triggerElement}

				<DrawerContent className={contentClassName}>
					<DrawerHeader className='text-left'>
						<DrawerTitle>{title}</DrawerTitle>
						<DrawerDescription>{_description}</DrawerDescription>
					</DrawerHeader>
					<div className='flex h-full overflow-hidden'>
						<ScrollArea className='w-1 flex-1'>
							<div className='px-4 pb-2'>{content}</div>
						</ScrollArea>
					</div>
					{isShowFooter && (
						<DrawerFooter className='pt-2'>
							<Button onClick={handleConfirm} disabled={isPending}>
								{confirmButtonText ?? 'Confirm'}
							</Button>
							<DrawerClose asChild>
								<Button variant='outline' disabled={isPending}>
									{cancelButtonText ?? 'Cancel'}
								</Button>
							</DrawerClose>
						</DrawerFooter>
					)}
				</DrawerContent>
			</Drawer>
		)
	}
)

ResponsiveDialog.displayName = 'ResponsiveDialog'
