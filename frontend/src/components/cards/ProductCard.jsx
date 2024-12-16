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
import { useAddProductToCart } from '@/hooks/cart/useAddProductToCart'
import { useRouter } from 'next/navigation'

export const ProductCard = ({ product }) => {
	const router = useRouter()

	const { addProductToCartMutate, isPendingAddProductToCart } =
		useAddProductToCart()

	const handleAddProductToCart = (e) => {
		e.stopPropagation()

		!isPendingAddProductToCart &&
			addProductToCartMutate({
				product_id: product.id,
				quantity: 1,
			})
	}

	const handleRouteToProduct = () => {
		router.push(`/products/${product.id}`)
	}

	return (
		<Card
			className='hover:bg-primary-foreground hover:-translate-y-1 cursor-pointer transition-all flex flex-col overflow-hidden min-h-[365px]'
			onClick={handleRouteToProduct}
		>
			<div className='flex w-full mb-4 min-h-44 max-h-44 overflow-hidden grow'>
				<Image
					width={283}
					height={176}
					quality={50}
					src={makeImageUrlFromPath(product?.product_images?.[0]?.image_path)} // Replace with your actual image path
					alt={product.name}
					className='w-full h-full object-scale-down mt-auto'
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
					<span
						className={cn(
							'flex items-center gap-2',
							product.stock ? 'text-primary' : 'text-muted-foreground'
						)}
					>
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
								<Button
									variant='outline'
									size='icon'
									className='size-9'
									disabled={!product.stock > 0}
									onClick={handleAddProductToCart}
								>
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
