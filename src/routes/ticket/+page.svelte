<script lang="ts">
	import { enhance } from '$app/forms';
	import Nav from '../../components/Nav.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: { message?: string };
</script>

<Nav />

<div class="max-w-lg mx-auto">
	<h1 class="h1">Create a Ticket</h1>
	<form method="post" use:enhance>
		{#if data.user?.role !== 'USER'}
			<select class="select m-1" id="owner" name="owner">
				<option>Select User...</option>
				{#each data.userOptions as user}
					<option value={user.id}>{user.name}</option>
				{/each}
			</select>
		{/if}
		<input
			class="input m-1 rounded-md"
			type="text"
			id="phone"
			name="phone"
			placeholder="Phone Number"
			required
		/>
		<input
			class="input rounded-md m-1"
			type="text"
			id="title"
			name="title"
			placeholder="Title..."
			required
		/>
		<textarea
			class="textarea m-1"
			rows="6"
			id="issue"
			name="issue"
			placeholder="Issue..."
			required
		/>
		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
	{#if form?.message}
		<p class="error">{form.message || ''}</p>
	{/if}
</div>
