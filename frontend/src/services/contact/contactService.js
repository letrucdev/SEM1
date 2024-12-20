import { instance } from '@/lib/axios'

const contactService = {
    sendTicket: async (data) => await instance.post('/support-tickets', data),
    getTickets: async (params) => await instance.get('/support-tickets', { params }),
}

export { contactService }
