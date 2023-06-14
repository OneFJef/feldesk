<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { dayjs } from 'svelte-time';
	import Nav from '../../../components/Nav.svelte';

	export let data: PageData;
</script>

<Nav />

<div class="flex flex-wrap justify-center">
	<h2 class="h2 min-w-full mt-6 px-2">Ticket: {data.ticket?.id}</h2>
	<div class="card min-w-full">
		<header class="card-header flex justify-between items-center">
			{data.ticket?.title}
			<div class="flex">
				{#if (!data.ticket?.agent[0] && data.user.role !== 'USER') || data.ticket?.agent[0].id !== data.user.userId}
					<form method="post" use:enhance action="?/pickupTicket">
						<button class="btn btn-sm variant-filled">Pickup Ticket</button>
					</form>
				{/if}
				{#if data.ticket?.status === 'CLOSED'}
					<form method="post" use:enhance action="?/openTicket">
						<button class="btn btn-sm variant-filled">Re-Open Ticket</button>
					</form>
				{:else}
					<form method="post" use:enhance action="?/closeTicket">
						<button class="btn btn-sm variant-filled">Close Ticket</button>
					</form>
				{/if}
			</div>
		</header>
		<div class="card m-4 p-4 flex justify-evenly">
			<div class="">
				<div>
					User: {data.ticket?.owner[0].name}
				</div>
				<div>
					Email: {data.user?.email}
				</div>
				<div>
					Phone: {data.ticket?.phone}
				</div>
			</div>
			<span class="divider-vertical mx-4" />
			<div class="">
				<div>
					Assigned Tech:
					{#if !data.ticket?.agent[0]}
						Unassigned
					{:else}
						<!-- error thrown when .name is added -->
						{data.ticket.agent[0].name}
					{/if}
				</div>
				<div class="flex">
					Status:&nbsp
					{#if data.ticket?.status === 'OPEN'}
						<div class="text-red-500">{data.ticket?.status}</div>
					{:else if data.ticket?.status === 'WORKING'}
						<div class="text-yellow-500">Status: {data.ticket?.status}</div>
					{:else}
						<div class="text-green-500">Status: {data.ticket?.status}</div>
					{/if}
				</div>
				<div>
					Last Update: {dayjs(data.ticket?.updatedAt).fromNow()}
				</div>
			</div>
		</div>
		<footer class="card-footer">{data.ticket?.issue}</footer>
	</div>

	<h2 class="h2 min-w-full mt-8 px-2">Notes</h2>
	<div class="card min-w-full">
		<div class="p-4">
			<form method="post" use:enhance action="?/note">
				<textarea class="textarea mb-2" rows="3" id="note" name="note" required />
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
