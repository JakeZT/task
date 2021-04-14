import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// type httpType = any
class HttpRequest {
	constructor(baseUrl = '') {
		this.baseUrl = baseUrl
		this.queue = {}
	}

	getInsideConfig() {
		const config = {
			baseURL: this.baseUrl,
			headers: {},
		}
		return config
	}

	destroy(url) {
		delete this.queue[url]
		if (!Object.keys(this.queue).length) {
		}
	}

	interceptors(instance, url) {
		instance.interceptors.request.use(
			(config) => {
				NProgress.start()
				if (!Object.keys(this.queue).length) {
				}
				this.queue[url] = true
				console.log(config)
				return config
			},
			(error) => {
				return Promise.reject(error)
			}
		)

		instance.interceptors.response.use(
			(res) => {
				NProgress.done()
				this.destroy(url)
				console.log(res)
				const { data } = res
				return data
			},
			(error) => {
				this.destroy(url)
				return Promise.reject(error.response)
			}
		)
	}

	request(options) {
		const instance = axios.create()
		options = Object.assign(this.getInsideConfig(), options)
		this.interceptors(instance, options.url)
		return instance(options)
	}
}
export default HttpRequest
