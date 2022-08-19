<script>
	import '../app.css';
</script>

<slot />

<style>
	@font-face {
		font-family: 'Custom';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(/fonts/Regular.ttf);
	}

	@font-face {
		font-family: 'Custom';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: url(/fonts/Bold.ttf);
	}

	:root {
		--bg-color: #fff;
		--dot-color: #000;
		--dot-size: 2px;
		--dot-space: 40px;
	}

	:global(body) {
		font-family: 'Custom', sans-serif;
		background: linear-gradient(
					90deg,
					var(--bg-color) calc(var(--dot-space) - var(--dot-size)),
					transparent 1%
				)
				center,
			linear-gradient(var(--bg-color) calc(var(--dot-space) - var(--dot-size)), transparent 1%)
				center,
			var(--dot-color);
		background-size: var(--dot-space) var(--dot-space);
	}
</style>
