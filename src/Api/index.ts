import axios from './ajax'

export const getYears = () => {
	return axios.request({
		url: '/getVehicleYears',
		method: 'get',
	})
}

export const getMakes = (year: string) => {
	return axios.request({
		url: `/getVehicleMakes?year=${year}`,
		method: 'get',
	})
}
export const getModels = (year: string, make: string) => {
	return axios.request({
		url: `/getVehicleModels?year=${year}&make=${make}`,
		method: 'get',
	})
}

export const getUserData = (phone: string) => {
	return axios.request({
		url: '/findCustomerByPhone',
		method: 'post',
		data: {
			countryCode: '1',
			phoneNumber: phone || '6479887765',
		},
	})
}
