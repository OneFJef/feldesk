<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { dayjs } from 'svelte-time';
	import Nav from '../../../components/Nav.svelte';

	export let data: PageData;
</script>

<Nav />

<div class="flex flex-wrap justify-center pb-16">
	<h2 class="h2 min-w-full mt-6 px-2">Ticket: {data.ticket?.id}</h2>
	<div class="card">
		<header class="card-header flex justify-between items-center">
			{data.ticket?.title}
			{#if data.ticket?.status === 'CLOSED'}
				<form method="post" use:enhance action="?/openTicket">
					<button class="btn btn-sm variant-filled">Re-Open Ticket</button>
				</form>
			{:else}
				<form method="post" use:enhance action="?/closeTicket">
					<button class="btn btn-sm variant-filled">Close Ticket</button>
				</form>
			{/if}
		</header>
		<div class="card m-4 p-4 flex justify-evenly">
			<div class="grid grid-cols-2">
				<div>User:</div>
				{#if data.ticket?.authUser[0].role !== 'USER'}
					<div>{data.ticket?.authUser[1].name}</div>
				{:else}
					<div>{data.ticket?.authUser[1].name}</div>
				{/if}
				<div>Email:</div>
				<div>{data.user?.email}</div>
				<div>Phone:</div>
				<div>{data.ticket?.phone}</div>
			</div>
			<span class="divider-vertical mx-4" />
			<div class="grid grid-cols-2 gap-x-8">
				<div>Assigned Tech:</div>
				<div>
					{#if !data.ticket?.authUser[1]}
						Unassigned
					{:else if data.ticket?.authUser[1].role !== 'USER'}
						<div>{data.ticket?.authUser[0].name}</div>
					{:else}
						<div>{data.ticket?.authUser[0].name}</div>
					{/if}
				</div>
				<div>Status:</div>

				{#if data.ticket?.status === 'OPEN'}
					<div class="text-red-500">{data.ticket?.status}</div>
				{:else if data.ticket?.status === 'WORKING'}
					<div class="text-yellow-500">{data.ticket?.status}</div>
				{:else}
					<div class="text-green-500">{data.ticket?.status}</div>
				{/if}

				<div>Last Update:</div>
				<div>{dayjs(data.ticket?.updatedAt).fromNow()}</div>
			</div>
		</div>
		<footer class="card-footer">{data.ticket?.issue}</footer>
	</div>

	<h2 class="h2 min-w-full mt-8 px-2">Notes</h2>
	<div class="card min-w-full">
		<div class="p-4">
			<form method="post" use:enhance action="?/note">
				<textarea class="textarea mb-2" rows="4" id="note" name="note" required />
				<button class="btn variant-filled" type="submit">Submit</button>
			</form>
		</div>
		{#each data.note as note}
			<hr />
			<div class="flex">
				<div class="flex-none mt-4 pl-4">
					<div>
						<div>{note.AuthUser?.name}</div>
						<div>{dayjs(note.createdAt).format('MMM D @ HH:mm')}</div>
					</div>
				</div>
				<div class="card m-4 w-full">
					<div class="p-4">{note.content}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
