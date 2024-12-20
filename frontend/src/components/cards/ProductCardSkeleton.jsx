import { Skeleton } from '../ui/skeleton'

export const ProductCardSkeleton = () => {
	return (
		<div className='flex h-[365px]'>
			<Skeleton className='w-full h-full' />
		</div>
	)
}
