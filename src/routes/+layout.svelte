<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { navigating } from '$app/stores';
	import Loading from '../components/Loading.svelte';
</script>

<div class="xl:max-w-7xl xl:mx-auto m-8">
	{#if $navigating}
		<Loading />
	{/if}
	<slot />
</div>
