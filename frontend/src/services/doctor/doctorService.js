const { instance } = require('@/lib/axios')

const doctorService = {
	getDoctors: async (params) =>
		await instance.get('/doctors', {
			params,
		}),
	getDoctor: async (id) => {
		// Implementation to fetch and return doctor data by id
	},
	createDoctor: async (payload) => {
		const formData = new FormData()
		for (const key in payload) {
			formData.append(key, payload[key])
		}

		await instance.post('/doctors', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},

	updateDoctor: async ({ doctorId, ...payload }) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) {
				formData.append(key, payload[key])
			}
		}

		await instance.post(`/doctors/${doctorId}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},
	deleteDoctor: async (doctorId) =>
		await instance.delete(`/doctors/${doctorId}`),
}

export { doctorService }
