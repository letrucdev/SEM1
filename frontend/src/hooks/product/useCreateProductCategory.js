import { productService } from '@/services/product/productService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateProductCategory = () => {
    const queryClient = useQueryClient()
    const { data, isPending, mutate, mutateAsync } = useMutation({
        mutationFn: productService.createProductCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productCategories'] })
            toast.success('Create product category successfully!')
        },
    })

    const createProductCategoryResponse = data?.data?.data
    const isPendingCreateProductCategory = isPending
    const createProductCategoryMutate = mutate
    const createProductCategoryMutateAsync = mutateAsync

    return {
        createProductCategoryMutate,
        createProductCategoryMutateAsync,
        createProductCategoryResponse,
        isPendingCreateProductCategory,
    }
}
