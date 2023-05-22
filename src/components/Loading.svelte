<script lang="ts">
	import { Clock } from 'svelte-loading-spinners';
</script>

<div class="fixed left-0 top-0 bg-black opacity-50 z-40 w-screen h-screen" />
<div class="fixed z-50 bg-transparent left-1/2 top-1/2 -translate-x-16 -translate-y-16">
	<div class="card p-4 w-32 h-32 flex justify-center items-center">
		<Clock size="100" color="#0fba81" unit="px" duration="10s" />
	</div>
</div>
