import { instance } from '@/lib/axios'

const cartSerivce = {
    getCarts: async (params) => await instance.get('/carts', { params }),
}

export { cartSerivce }
