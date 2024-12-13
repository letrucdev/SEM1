'use client'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useHandleFormError } from '@/hooks/form/useHandleFormError'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSendTicket } from '@/hooks/contact/useSendTicket'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

const formSchema = z
	.object({
		contact_email: z
			.string({
				required_error: 'Email is required',
			})
			.email(),
		contact_phone: z
			.string({ required_error: 'Contact phone is required' })
			.min(10, 'Contact phone must be at least 10 number')
			.max(20, 'Contact phone must be less than or equal to 20 characters')
			.refine((val) => !isNaN(val), {
				message: 'Contact phone must be a valid number',
			}),
		subject: z
			.string({ required_error: 'Subject is required' })
			.max(100, 'Subject must be less than or equal to 100 characters'),
		message: z
			.string({ required_error: 'Message is required' })
			.max(1000, 'Message must be less than or equal to 1000 characters'),
	})
	.required()

export default function ContactUsPage() {
	const { handleFormError } = useHandleFormError()
	const { isPendingSendTicket, sendTicketMutateAsync } = useSendTicket()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			contact_email: undefined,
			contact_phone: undefined,
			subject: undefined,
			message: undefined,
		},
	})

	const { reset } = form

	async function onSubmit(values) {
		try {
			await sendTicketMutateAsync(values)
		} catch (error) {
			handleFormError(error, form)
		} finally {
			reset()
		}
	}

	return (
		<div className='flex flex-col xl:flex-row justify-between py-12 container mx-auto gap-3 md:gap-8 px-6'>
			<div className='flex flex-col w-full'>
				<div className='flex flex-col mb-3'>
					<h2 className='text-3xl md:text-5xl font-bold mb-4 text-balance'>
						SEND US YOUR QUESTIONS & COMMENTS
					</h2>
					<p className='text-secondary-foreground text-sm md:text-lg'>
						Your feedback is invaluable to us. Whether you have questions about
						our services, want to schedule an appointment, or simply wish to
						share your experience, we&apos;re here to listen.
					</p>
				</div>
				<div className='flex grow mt-8 flex-col md:flex-row gap-16'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8 order-2 md:order-1 shrink-0 grow'
						>
							<FormField
								control={form.control}
								name='contact_email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contact Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='m@example.com'
												{...field}
												value={field.value ?? ''}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='contact_phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contact Phone</FormLabel>
										<FormControl>
											<Input type='tel' {...field} value={field.value ?? ''} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='subject'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Subject</FormLabel>
										<FormControl>
											<Input {...field} value={field.value ?? ''} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='message'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Message</FormLabel>
										<FormControl>
											<Textarea
												rows={10}
												placeholder='Type your message here.'
												{...field}
												value={field.value ?? ''}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type='submit'
								className='w-full'
								disabled={!form.formState.isDirty || isPendingSendTicket}
							>
								Send ticket
								{isPendingSendTicket && <Loader2 className='animate-spin' />}
							</Button>
						</form>
					</Form>

					<div className='flex flex-col order-1 md:order-2 grow gap-4'>
						<div className='flex flex-col shrink-0'>
							<h3 className='text-lg font-semibold mb-4'>Opening Hours</h3>
							<ul className='space-y-2'>
								<li>
									<span className='flex justify-between'>
										<span>Monday</span>
										<span>9:00am - 6:00pm</span>
									</span>
								</li>
								<li>
									<span className='flex justify-between'>
										<span className='text-gray-400'>Tuesday</span>
										<span className='text-gray-400'>CLOSED</span>
									</span>
								</li>
								<li>
									<span className='flex justify-between'>
										<span>Wednesday</span>
										<span>9:00am - 6:00pm</span>
									</span>
								</li>
								<li>
									<span className='flex justify-between'>
										<span className='text-gray-400'>Thursday</span>
										<span className='text-gray-400'>CLOSED</span>
									</span>
								</li>
								<li>
									<span className='flex justify-between'>
										<span>Friday</span>
										<span>9:00am - 6:00pm</span>
									</span>
								</li>
								<li>
									<span className='flex justify-between'>
										<span>Saturday</span>
										<span>9:00am - 2:00pm</span>
									</span>
								</li>
								<li>
									<span className='flex justify-between'>
										<span>Sunday</span>
										<span>9:00am - 2:00pm</span>
									</span>
								</li>
							</ul>
						</div>

						<Separator />

						<div className='flex flex-col shrink-0'>
							<h3 className='text-lg font-semibold mb-4'>Contact Detail</h3>
							<ul className='space-y-2'>
								<li>
									<span className='flex justify-between'>
										<span>Email</span>
										<span>dental@mail.com</span>
									</span>
								</li>
								<li>
									<span className='flex justify-between'>
										<span>Phone</span>
										<span>(613) 689-9908</span>
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
