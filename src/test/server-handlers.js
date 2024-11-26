// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import { rest, http } from 'msw' // msw supports graphql too!

const handlers = [
	http.get(`https://jsonplaceholder.typicode.com/posts`, async (req, res, ctx) => {
		return res(ctx.json([
				{
					postId: 1,
					title: 'foo',
					body: 'bar',
					userId: 1
				}
			]),
		)
	}),
]

export { handlers }