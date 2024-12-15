import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useHandleFormError } from '@/hooks/form/useHandleFormError'
import { useCreateOrder } from '@/hooks/order/useCreateOrder'
import { useRouter } from 'next/navigation'

const formSchema = z
	.object({
		delivery_address: z.string({
			required_error: 'Delivery address is required',
		}),
	})
	.required()

export const PlaceOrderForm = forwardRef(
	({ onSuccess, cartId, products }, ref) => {
		const { handleFormError } = useHandleFormError()
		const { createOrderMutateAsync } = useCreateOrder()

		const form = useForm({
			resolver: zodResolver(formSchema),
		})

		const router = useRouter()

		const onSubmit = useCallback(
			async (values) => {
				try {
					await createOrderMutateAsync({ cartId, products, ...values })
					localStorage.removeItem(`checkout-${cartId}`)
					onSuccess && onSuccess()
					router.push(`/cart`)
				} catch (error) {
					handleFormError(error, form)
				}
			},
			[cartId, createOrderMutateAsync, form, handleFormError, onSuccess]
		)

		useImperativeHandle(
			ref,
			() => {
				return {
					submit() {
						form.handleSubmit(onSubmit)()
					},
				}
			},
			[form, onSubmit]
		)

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='delivery_address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Delivery Address</FormLabel>
								<FormControl>
									<Input {...field} value={field.value ?? ''} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		)
	}
)

PlaceOrderForm.displayName = 'PlaceOrderForm'
