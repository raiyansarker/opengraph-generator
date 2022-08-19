/** @type {import('./$types').PageLoad} */
export function load({ url: { searchParams } }) {
	return {
		title:
			searchParams.get('title') === null
				? 'This is just a demo title if no title is specified. Add title as the query parameter in the url to get title shown here!'
				: searchParams.get('title'),
		author: searchParams.get('author') === null ? 'Elon Musk' : searchParams.get('author'),
		avatar: searchParams.get('avatar') === null ? '/avatar.jpg' : searchParams.get('avatar')
	};
}
