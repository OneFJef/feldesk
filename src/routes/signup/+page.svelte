<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: { message?: string };
</script>

<div class="flex items-center justify-center h-screen -translate-y-8">
	<div class="max-w-lg mx-auto">
		<h1 class="h1">Create an Account</h1>
		<form method="post" use:enhance>
			<input
				class="input m-1 rounded-md"
				type="text"
				id="name"
				name="name"
				placeholder="Name (e.g. John Smith)"
				required
			/>
			<input
				class="input m-1 rounded-md"
				type="email"
				id="email"
				name="email"
				placeholder="Email"
				required
			/>
			<input
				class="input m-1 rounded-md"
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				required
			/>
			<input class="btn variant-filled m-1" type="submit" value="Continue" />
		</form>
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/login" class="anchor m-1">Login</a>
	</div>
</div>
