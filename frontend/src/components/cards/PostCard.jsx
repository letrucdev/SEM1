import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { makeResourcePublicUrlFromPath } from '@/lib/utils'
/* import blog2Banner from '@/public/blog2.png' */
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'

export const PostCard = ({ post }) => {
	return (
		<Link href={`/education/posts/${post.id}`}>
			<Card className='hover:bg-primary-foreground hover:-translate-y-1 cursor-pointer transition-all flex overflow-hidden min-h-48'>
				<div className='flex overflow-hidden grow shrink-0 max-h-full w-52'>
					<Image
						src={makeResourcePublicUrlFromPath(post.thumbnail_path)}
						alt='Post thumbnail'
						width={480}
						height={240}
						className='w-full object-cover aspect-video'
						priority
					/>
				</div>

				<CardHeader className='min-h-48 h-full w-full break-all flex flex-col'>
					<CardTitle className='text-xl line-clamp-3 break-words shrink-0 grow text-balance'>
						{post.title}
					</CardTitle>

					<CardDescription className='flex w-full h-full grow'>
						<p className='w-full break-words line-clamp-3'>
							{post.description}
						</p>
					</CardDescription>

					<Button>Read More</Button>
				</CardHeader>
			</Card>
		</Link>
	)
}
