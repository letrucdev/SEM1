import { Skeleton } from '../ui/skeleton'

export const DentistCardSkeleton = () => {
	return (
		<div className='flex h-[480px]'>
			<Skeleton className={'w-full h-full'} />
		</div>
	)
}
