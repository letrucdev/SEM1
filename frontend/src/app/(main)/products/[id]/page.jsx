'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useAddProductToCart } from '@/hooks/cart/useAddProductToCart'
import { useGetProductDetail } from '@/hooks/product/useGetProductDetail'
import { useRateProduct } from '@/hooks/product/useRateProduct'
import { formatCurrency, makeResourcePublicUrlFromPath } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { SwiperNavButtons } from '@/components/swiper/SwiperNavButtons'

export default function ProductDetailPage({ params: { id } }) {
	const [quantity, setQuantity] = useState(1)
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [slideStatus, setSlideStatus] = useState({
		isBegin: true,
		isEnd: false,
	})

	const { product, isPendingGetProductDetail } = useGetProductDetail(id)
	const { addProductToCartMutate, isPendingAddProductToCart } =
		useAddProductToCart()

	const { rateProductMutate } = useRateProduct()

	const handleChangeQuantity = useCallback(
		(event) => {
			if (event.target.value.trim().length === 0) {
				return setQuantity('')
			}

			if (isNaN(event.target.value) || event.target.value < 1) return

			if (event.target.value > product.stock) {
				return setQuantity(product.stock)
			}

			setQuantity(parseInt(event.target.value))
		},
		[product?.stock]
	)

	const handleAddProductToCart = () => {
		addProductToCartMutate({ product_id: product.id, quantity })
	}

	const handleRating = (rate) =>
		rateProductMutate({ productId: id, star: rate })

	return (
		<div className='flex flex-col xl:flex-row justify-between pt-6 pb-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				{!isPendingGetProductDetail && product && (
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href='/'>Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href='/products'>Products</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{product.name}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				)}
				{isPendingGetProductDetail && !product && (
					<Skeleton className={'w-80 h-5'} />
				)}

				<div className='flex mb-3'>
					<Card className='w-full'>
						<CardContent className='flex w-full pt-6 lg:flex-row flex-col gap-12'>
							{!isPendingGetProductDetail && product && (
								<>
									<div className='flex flex-col'>
										<div className='lg:w-[500px] aspect-square bg-muted rounded-md shrink-0 flex items-center justify-center overflow-hidden'>
											<Swiper
												spaceBetween={10}
												thumbs={{ swiper: thumbsSwiper }}
												modules={[Thumbs]}
												className='lg:w-[500px] h-full'
												onSlideChange={(swiper) => {
													setSlideStatus({
														isBegin: swiper.isBeginning,
														isEnd: swiper.isEnd,
													})
												}}
											>
												{product.product_images?.map((image) => (
													<SwiperSlide key={image.id}>
														<div className='w-full aspect-square p-12 select-none'>
															<Image
																priority
																className='w-full h-full object-scale-down'
																alt={product.name}
																width={512}
																height={512}
																src={makeResourcePublicUrlFromPath(image.image_path)}
															/>
														</div>
													</SwiperSlide>
												))}

												{product.product_images.length > 1 && (
													<SwiperNavButtons
														isBegin={slideStatus.isBegin}
														isEnd={slideStatus.isEnd}
													/>
												)}
											</Swiper>
										</div>

										<div className='lg:w-[500px] shrink-0 flex overflow-hidden rounded-md mt-3'>
											<Swiper
												onSwiper={setThumbsSwiper}
												spaceBetween={10}
												slidesPerView={4}
												watchSlidesProgress={true}
												modules={[Thumbs]}
												className='swipper-thumbs w-full h-full shrink-0'
											>
												{product?.product_images?.map((image) => (
													<SwiperSlide key={image.id}>
														<div className='w-full aspect-square bg-muted p-2 select-none rounded-md'>
															<Image
																priority
																className='w-full h-full object-scale-down'
																alt={product.name}
																width={512}
																height={512}
																src={makeResourcePublicUrlFromPath(image.image_path)}
															/>
														</div>
													</SwiperSlide>
												))}
											</Swiper>
										</div>
									</div>

									<div className='flex flex-col gap-2 w-full'>
										<h3 className='text-3xl font-bold'>{product.name}</h3>
										<div className='flex items-center gap-2'>
											<div className='flex items-center gap-2'>
												<span className='mt-auto text-sm font-semibold'>
													{product.product_rates_avg_star ?? '0.0'}
												</span>
												<Rating
													size={20}
													onClick={handleRating}
													initialValue={product.product_rates_avg_star ?? 0}
													SVGclassName='inline'
													transition
												/>
											</div>

											<Separator orientation='vertical' />
											<span className='text-sm mt-auto'>
												<span className='font-semibold'>
													{new Intl.NumberFormat('en-US', {
														notation: 'compact',
													}).format(product.product_rates_count)}
												</span>{' '}
												Ratings
											</span>

											<Separator orientation='vertical' />
											<span className='text-sm mt-auto'>
												<span className='font-semibold'>
													{new Intl.NumberFormat('en-US', {
														notation: 'compact',
													}).format(product.stock || 0)}
												</span>{' '}
												Instock
											</span>
										</div>

										<div className='text-4xl mt-4 w-full bg-muted p-4 rounded-md text-primary flex items-center gap-4'>
											<span>{formatCurrency(product.price)}</span>
											<span className='text-muted-foreground text-xl line-through'>
												{formatCurrency(product.price)}
											</span>
											<Badge>0%</Badge>
										</div>

										<div className='flex items-center gap-3 mt-3'>
											<Label>Quantity</Label>
											<Input
												className='w-28'
												type='number'
												min={1}
												max={product.stock}
												value={quantity}
												onKeyDown={(e) => {
													if (
														e.key === '-' ||
														e.key === 'e' ||
														e.key === '.' ||
														e.key === ','
													) {
														e.preventDefault()
													}
												}}
												onChange={handleChangeQuantity}
												disabled={isPendingAddProductToCart}
											/>
										</div>

										<div className='flex mt-6'>
											<Button
												onClick={handleAddProductToCart}
												disabled={
													isPendingAddProductToCart ||
													!quantity ||
													!product.stock
												}
											>
												<ShoppingCart /> Add To Cart
											</Button>
										</div>
									</div>
								</>
							)}

							{isPendingGetProductDetail && !product && (
								<>
									<Skeleton
										className={
											'lg:w-[500px] aspect-square bg-muted rounded-md shrink-0'
										}
									/>
									<div className='flex flex-col gap-2 w-full'>
										<Skeleton className={'w-full h-10'} />

										<div className='flex items-center gap-2'>
											<div className='flex items-center gap-2'>
												<Skeleton className={'w-36 h-6'} />
											</div>
											<Separator orientation='vertical' />
											<span className='text-sm mt-auto'>
												<Skeleton className={'w-36 h-6'} />
											</span>
											<Separator orientation='vertical' />
											<span className='text-sm mt-auto'>
												<Skeleton className={'w-36 h-6'} />
											</span>
										</div>

										<div className='text-4xl mt-4 w-full bg-muted p-4 rounded-md text-primary flex items-center gap-4'>
											<Skeleton className={'w-40 h-10'} />
										</div>

										<div className='flex items-center gap-10 mt-3'>
											<Skeleton className={'w-44 h-8'} />
										</div>

										<div className='flex mt-6'>
											<Skeleton className={'w-40 h-10'} />
										</div>
									</div>
								</>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
