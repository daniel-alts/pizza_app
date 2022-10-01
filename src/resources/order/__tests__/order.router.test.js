const router = require('../order.router')

describe('order router', () => {
	it('has crud routes', () => {
		const routes = [
			{ path: '/', method: 'get' },
			{ path: '/', method: 'post' },
			{ path: '/:id', method: 'get' },
			{ path: '/:id', method: 'patch' },
			{ path: '/:id', method: 'delete' },
		]

		//loops through the routes above
		routes.forEach((route) => {
            console.log(router.stack)
			// .stack stacks up the route in layers with respect to the route
			const match = router.stack.find(
				(s) =>
					s.route.path === route.path &&
					s.route.methods[route.method],
			)
			expect(match).toBeTruthy()
		})
	})
})
