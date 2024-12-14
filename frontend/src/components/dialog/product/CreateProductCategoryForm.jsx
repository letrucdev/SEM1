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
import { useCreateProductCategory } from '@/hooks/product/useCreateProductCategory'

const formSchema = z
    .object({
        name: z.string({
            required_error: 'Product category name is required',
        }),
    })
    .required()

export const CreateProductCategoryForm = forwardRef(({ onSuccess }, ref) => {
    const { handleFormError } = useHandleFormError()
    const { createProductCategoryMutateAsync } = useCreateProductCategory()

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = useCallback(
        async (values) => {
            try {
                await createProductCategoryMutateAsync(values)
                onSuccess && onSuccess()
            } catch (error) {
                handleFormError(error, form)
            }
        },
        [createProductCategoryMutateAsync, form, handleFormError, onSuccess]
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
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
})

CreateProductCategoryForm.displayName = 'CreateProductCategoryForm'
