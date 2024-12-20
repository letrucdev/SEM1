import { useAuth } from '@/contexts/AuthProvider'
import { cartSerivce } from '@/services/cart/cartService'
import { useQuery } from '@tanstack/react-query'

export const useGetCart = () => {
	const { user } = useAuth()
	const { data, isPending, refetch } = useQuery({
		queryKey: ['cart'],
		queryFn: cartSerivce.getCart,
		enabled: !!user,
	})

	const cart = data?.data?.data
	const cartTotal = data?.data?.total || 0
	const isPendingGetCarts = isPending
	const refetchCarts = refetch

	return {
		cart,
		cartTotal,
		isPendingGetCarts,
		refetchCarts,
	}
}
