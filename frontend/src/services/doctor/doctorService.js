const { instance } = require('@/lib/axios')

const doctorService = {
	getDoctors: async (params) =>
		await instance.get('/doctors', {
			params,
		}),
	getDoctor: async (id) => {
		// Implementation to fetch and return doctor data by id
	},
	createDoctor: async (doctorData) => {
		// Implementation to create a new doctor
	},
	updateDoctor: async (doctorId, updatedDoctorData) => {
		// Implementation to update an existing doctor
	},
	deleteDoctor: async (doctorId) => {
		// Implementation to delete a doctor
	},
}

export { doctorService }
