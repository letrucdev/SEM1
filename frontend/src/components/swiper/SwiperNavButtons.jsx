import { useSwiper } from 'swiper/react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const SwiperNavButtons = ({ isBegin, isEnd }) => {
	const swiper = useSwiper()

	return (
		<>
			<Button
				size='icon'
				disabled={isBegin}
				onClick={() => swiper.slidePrev()}
				className='top-[50%] absolute z-10 -translate-y-[50%] left-2 size-6'
			>
				<ChevronLeft />
			</Button>
			<Button
				size='icon'
				disabled={isEnd}
				onClick={() => swiper.slideNext()}
				className='top-[50%] absolute z-10 -translate-y-[50%] right-2 size-6'
			>
				<ChevronRight />
			</Button>
		</>
	)
}
