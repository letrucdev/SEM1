import { productService } from '@/services/product/productService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: productService.createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			toast.success('Create product successfully!')
		},
	})

	const createProductResponse = data?.data
	const isPendingCreateProduct = isPending
	const createProductMutate = mutate
	const createProductMutateAsync = mutateAsync

	return {
		createProductResponse,
		isPendingCreateProduct,
		createProductMutate,
		createProductMutateAsync,
	}
}
