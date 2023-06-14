<script lang="ts">
	import type { PageData } from './$types';
	import { dayjs } from 'svelte-time';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import Nav from '../../components/Nav.svelte';

	export let data: PageData;
	let tabSet: number = 0;
</script>

<Nav />

<!-- <pre>
{JSON.stringify(data.activeTickets , null, 2)}	
</pre> -->

<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}>Active Tickets</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Closed Tickets</Tab>
	{#if data.user.role !== 'USER'}
		<Tab bind:group={tabSet} name="tab2" value={2}>Unassigned Tickets</Tab>
	{/if}

	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class="table-container m-1">
				<table class="table table-compact table-hover">
					<thead>
						<tr>
							<th>Ticket</th>
							<th>Title</th>
							<th>Status</th>
							{#if data.user.role !== 'USER'}
								<th>User</th>
								<th>Last Updated</th>
							{:else}
								<th>Last Updated</th>
								<th>Tech</th>
							{/if}
							<th>Created</th>
						</tr>
					</thead>
					<tbody>
						{#each data.activeTickets as ticket}
							<tr>
								<a href="/ticket/{ticket.id.toString()}">
									<td>{ticket.id}</td>
								</a>
								<td>{ticket.title}</td>
								{#if ticket.status === 'OPEN'}
									<td class="text-red-500">{ticket.status}</td>
								{:else if ticket.status === 'WORKING'}
									<td class="text-yellow-500">{ticket.status}</td>
								{/if}
								{#if data.user.role !== 'USER'}
									<td>{ticket.owner[0].name}</td>
									<td>{dayjs(ticket.updatedAt).fromNow()}</td>
								{:else}
									<td>{dayjs(ticket.updatedAt).fromNow()}</td>
									<td>
										{#if !ticket.agent[0]}
											Unassigned
										{:else}
											{ticket.agent[0].name}
										{/if}
									</td>
								{/if}
								<td>{dayjs(ticket.createdAt).format('MMM D @ HH:mm')}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else if tabSet === 1}
			<div class="table-container m-1">
				<table class="table table-compact table-hover">
					<thead>
						<tr>
							<th>Ticket</th>
							<th>Title</th>
							<th>Status</th>
							{#if data.user.role !== 'USER'}
								<th>User</th>
								<th>Last Updated</th>
							{:else}
								<th>Last Updated</th>
								<th>Tech</th>
							{/if}
							<th>Created</th>
						</tr>
					</thead>
					<tbody>
						{#each data.closedTickets as ticket}
							<tr>
								<a href="/ticket/{ticket.id.toString()}">
									<td>{ticket.id}</td>
								</a>
								<td>{ticket.title}</td>
								<td class="text-green-500">{ticket.status}</td>
								{#if data.user.role !== 'USER'}
									<td>{ticket.owner[0].name}</td>
									<td>{dayjs(ticket.updatedAt).fromNow()}</td>
								{:else}
									<td>{dayjs(ticket.updatedAt).fromNow()}</td>
									<td>
										{#if !ticket.agent[0]}
											Unassigned
										{:else}
											{ticket.agent[0].name}
										{/if}
									</td>
								{/if}
								<td>{dayjs(ticket.createdAt).format('MMM D @ HH:mm')}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>
