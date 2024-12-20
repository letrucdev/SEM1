'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetPostDetail } from '@/hooks/post/useGetPostDetail'
import { makeResourcePublicUrlFromPath } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export default function PostPage({ params: { id } }) {
	const { post, isPendingGetPostDetail } = useGetPostDetail(id)

	return (
		<div className='flex flex-col justify-between pt-6 pb-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full gap-4'>
				{!post && isPendingGetPostDetail && <Skeleton className={'w-80 h-5'} />}

				{!!post && !isPendingGetPostDetail && (
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href={'/'}>Home</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink>Education</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink>Posts</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage className='line-clamp-2'>
									{post.title}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				)}

				<div className='flex items-center justify-center overflow-hidden w-full h-[450px]'>
					<div className='container w-full h-full flex items-center z-20 relative rounded-md overflow-hidden'>
						{!post && isPendingGetPostDetail && (
							<Skeleton className={'w-full h-full'} />
						)}

						{!!post && !isPendingGetPostDetail && (
							<>
								<div className='absolute w-full h-full from-black/90 bg-gradient-to-r z-10 flex items-center px-6 md:px-24'>
									<div className='w-full max-w-full text-background'>
										<h1 className='text-4xl md:text-6xl font-bold leading-tight mb-3 line-clamp-5'>
											{post.title}
										</h1>
										<p className='text-sm md:text-lg line-clamp-5'>
											{post.description}
										</p>
									</div>
								</div>
								<Image
									src={makeResourcePublicUrlFromPath(post.thumbnail_path)}
									alt='Banner Home'
									width={1080}
									height={450}
									className='w-full h-full object-cover absolute'
									priority
								/>
							</>
						)}
					</div>
				</div>

				{!!post && !isPendingGetPostDetail && (
					<Markdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
						className='prose max-w-full prose-img:max-w-full prose-img:rounded-md prose-img:my-2 prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg'
					>
						{post.content}
					</Markdown>
				)}
			</div>
		</div>
	)
}
