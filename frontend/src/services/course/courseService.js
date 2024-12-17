import { instance } from '@/lib/axios'

const courseService = {
	getCourses: async (params) => await instance.get('/courses', { params }),

	createCourse: async (payload) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) formData.append(key, payload[key])
		}

		return await instance.post('/courses', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},

	updateCourse: async ({ courseId, ...payload }) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) formData.append(key, payload[key])
		}

		return await instance.post(`/courses/${courseId}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},

	deleteCourse: async (courseId) =>
		await instance.delete(`/courses/${courseId}`),

	getCourseLessons: async (courseId) =>
		await instance.get(`/courses/${courseId}/lessons`),

	createCourseLesson: async ({ courseId, ...payload }) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) formData.append(key, payload[key])
		}

		return await instance.post(`/courses/${courseId}/lessons`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},

	updateCourseLesson: async ({ courseId, lessonId, ...payload }) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) formData.append(key, payload[key])
		}

		return await instance.post(
			`/courses/${courseId}/lessons/${lessonId}`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			}
		)
	},

	deleteCourseLesson: async ({ courseId, lessonId }) =>
		await instance.delete(`/courses/${courseId}/lessons/${lessonId}`),
}

export { courseService }
