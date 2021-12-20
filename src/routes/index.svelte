<script context="module">
	export const ssr = true;

	export function load({ page: { query } }) {
		return {
			props: {
				title: query.get('title') === null ? undefined : query.get('title'),
				author: query.get('author') === null ? undefined : query.get('author'),
				avatar: query.get('avatar') === null ? undefined : query.get('avatar')
			}
		};
	}
</script>

<script>
	export let title =
		'This is just a demo title if no title is specified. Add title as the query parameter in the url to get title shown here!';
	export let author = 'Demo Author';
	export let avatar = '/avatar.jpg';
</script>

<div class="grid grid-cols-1 grid-rows-6 w-screen h-screen overflow-hidden">
	<div class="row-span-5 w-10/12 mx-auto grid place-items-center h-full">
		<h1 class="text-5xl leading-snug tracking-wider text-center font-bold line-clamp-4">
			{title}
		</h1>
	</div>
	<div class="row-span-5">
		<div class="px-10 flex items-center h-full">
			<div class="flex justify-between items-center w-full">
				<div class="flex gap-x-3 items-center">
					<img
						src={avatar}
						alt="Avatar"
						class="w-14 h-14 rounded-full object-cover ring-2 ring-slate-900"
					/>
					<h1 class="text-3xl font-bold text-slate-800">{author}</h1>
				</div>
				<h1 class="text-5xl text-slate-500 font-bold">Raiyan Sarker Blog</h1>
			</div>
		</div>
	</div>
</div>
