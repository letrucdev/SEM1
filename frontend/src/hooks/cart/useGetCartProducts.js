import { DEFAULT_PAGINATION } from '@/constants'
import { cartSerivce } from '@/services/cart/cartService'
import { useQuery } from '@tanstack/react-query'

/* const getCartProductsDefaultParams = {
	...DEFAULT_PAGINATION,
} */

export const useGetCartProducts =
	(/* params = getCartProductsDefaultParams */) => {
		const { data, isPending, refetch } = useQuery({
			queryKey: ['cartProducts'],
			queryFn: () => cartSerivce.getCartProducts(),
		})

		const cartProducts = data?.data?.data || []
		const cartProductTotal = data?.data?.total || 0
		const isPendingGetCartProducts = isPending
		const refetchCartProducts = refetch

		return {
			cartProducts,
			cartProductTotal,
			isPendingGetCartProducts,
			refetchCartProducts,
		}
	}
