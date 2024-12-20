import { productService } from '@/services/product/productService'
import { useQuery } from '@tanstack/react-query'

export const useGetProductCategories = () => {
	const { data, isPending } = useQuery({
		queryKey: ['productCategories'],
		queryFn: () => productService.getProductCategories(),
	})

	const productCategories = data?.data?.data || []
	const isPendingGetProductCategories = isPending

	return { productCategories, isPendingGetProductCategories }
}
