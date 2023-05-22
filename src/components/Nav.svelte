<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
</script>

<div class="flex justify-between items-center mb-6">
	<form method="post" use:enhance action="?/signOut">
		<button class="btn variant-filled" type="submit">Sign out</button>
	</form>
	<div>
		{#if $page.url.pathname !== '/dashboard'}
			<a href="/dashboard">
				<button class="btn variant-filled m-1"> Dashboard </button>
			</a>
		{/if}
		<a href="/ticket">
			<button class="btn variant-filled m-1">Create Ticket</button>
		</a>
	</div>
</div>
