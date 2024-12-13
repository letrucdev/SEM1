import { DEFAULT_PAGINATION } from '@/constants'
import { productService } from '@/services/product/productService'
import { useQuery } from '@tanstack/react-query'

export const getProductsDefaultParams = {
	...DEFAULT_PAGINATION,
}

export const useGetProducts = (params = getProductsDefaultParams) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['product', params],
		queryFn: () => productService.getProducts(params),
	})

	const products = data?.data?.data || []
	const productTotal = data?.data?.total || 0
	const isPendingGetProducts = isPending
	const refetchProducts = refetch

	return {
		products,
		productTotal,
		isPendingGetProducts,
		refetchProducts,
	}
}
