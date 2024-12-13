import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'
import Image from 'next/image'
import { cn, formatCurrency, makeImageUrlFromPath } from '@/lib/utils'
import { Rating } from 'react-simple-star-rating'
import React from 'react'
import { ArchiveX, Check, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip'

export const ProductCard = ({ product }) => {
	const [rating, setRating] = React.useState(0)

	// Catch Rating value
	const handleRating = (rate) => {
		setRating(rate)

		// other logic
	}
	// Optinal callback functions
	const onPointerEnter = () => console.log('Enter')
	const onPointerLeave = () => console.log('Leave')
	const onPointerMove = (value, index) => console.log(value, index)

	return (
		<Card className='hover:bg-primary-foreground hover:-translate-y-1 cursor-pointer transition-all flex flex-col overflow-hidden min-h-[365px]'>
			<div className='flex w-full mb-4 min-h-44 max-h-44 overflow-hidden grow'>
				<Image
					width={500}
					height={500}
					src={makeImageUrlFromPath(product?.product_images?.[0]?.image_path)} // Replace with your actual image path
					alt={product.name}
					className='w-full h-full object-cover mt-auto'
				/>
			</div>
			<CardHeader className='pt-0 h-full justify-between'>
				<CardTitle className='text-xl line-clamp-2'>{product.name}</CardTitle>
				<CardDescription className='flex justify-between items-center'>
					<span className='leading-none text-base mt-auto'>
						{formatCurrency(product.price)}
					</span>

					<div className='flex items-center'>
						<Rating
							size={16}
							initialValue={product.product_rates_avg_star ?? 0}
							onClick={handleRating}
							onPointerEnter={onPointerEnter}
							onPointerLeave={onPointerLeave}
							onPointerMove={onPointerMove}
							SVGclassName='inline'
							transition
							readonly
							allowFraction
						/>
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent className='mt-auto'>
				<div className='flex justify-between'>
					<span className={cn('flex items-center gap-2', product.stock ? 'text-primary' : 'text-muted-foreground')}>
						{product.stock > 0 ? (
							<>
								<Check size={16} />
								In stock
							</>
						) : (
							<>
								<ArchiveX size={16} />
								Out stock
							</>
						)}
					</span>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant='outline' size='icon' className='size-9'>
									<ShoppingCart />
								</Button>
							</TooltipTrigger>
							<TooltipContent side='left'>
								<p>Add to cart</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardContent>
		</Card>
	)
}
