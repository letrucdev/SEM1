import { productService } from '@/services/product/productService'
import { useQuery } from '@tanstack/react-query'

export const useGetProductDetail = (productId) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['product', productId],
		queryFn: () => productService.getProductDetail(productId),
	})

	const product = data?.data?.data
	const isPendingGetProductDetail = isPending
	const refetchProductDetail = refetch

	return {
		product,
		isPendingGetProductDetail,
		refetchProductDetail,
	}
}
