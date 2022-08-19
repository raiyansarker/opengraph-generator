<script>
	export let data;
	const { title, author, avatar } = data;
</script>

<svelte:head>
	<title>OG Template</title>
	<meta property="og:title" content="OG Image Template" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://og-template.pages.dev" />
	<meta property="og:image" content="https://og-template.pages.dev/social.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1280" />
	<meta property="og:image:height" content="720" />
	<meta property="og:image:alt" content="OG Template" />
	<meta
		property="og:image:description"
		content="This is just a og image template which will get screenshoted and uploaded to media file server"
	/>
</svelte:head>
<div class="grid grid-cols-1 grid-rows-6 w-screen h-screen overflow-hidden">
	<div class="row-span-5 w-8/12 mx-auto grid place-items-center h-full">
		<h1 class="text-4xl leading-snug tracking-wider text-center font-bold line-clamp-3">
			{title}
		</h1>
	</div>
	<div class="row-span-5">
		<div class="px-48 flex items-start h-full">
			<div class="flex justify-between items-center w-full">
				<div class="flex gap-x-3 items-center">
					<img
						src={avatar}
						alt="Avatar"
						class="w-16 h-16 rounded-full object-cover ring-2 ring-slate-900"
					/>
					<h1 class="text-4xl font-bold text-slate-800">{author}</h1>
				</div>
				<h1 class="text-5xl text-slate-500 font-bold">Raiyan Sarker Blog</h1>
			</div>
		</div>
	</div>
</div>
