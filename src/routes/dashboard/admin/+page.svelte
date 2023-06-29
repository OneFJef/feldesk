<script lang="ts">
	import FaList from 'svelte-icons/fa/FaList.svelte';
	import FaWrench from 'svelte-icons/fa/FaWrench.svelte';
	import FaRegThumbsUp from 'svelte-icons/fa/FaRegThumbsUp.svelte';
	import Nav from '../../../components/Nav.svelte';

    // export let data: PageData;
</script>

<Nav />

<div class="flex flex-wrap justify-center">
	<div class="grid grid-cols-3 gap-4 min-w-full">
		<div class="card">
			<section class="flex justify-evenly p-4">
				<div class="w-10 mr-4 flex items-center">
					<FaList />
				</div>
				<div>
					<div class="flex flex-col text-center">
						<h3 class="text-xl">34</h3>
						<p>Total Tickets</p>
					</div>
				</div>
			</section>
		</div>
		<div class="card">
			<section class="flex justify-evenly p-4">
				<div class="w-10 mr-4 flex items-center text-red-500">
					<FaWrench />
				</div>
				<div>
					<div class="flex flex-col text-center">
						<h3 class="text-xl text-red-500">34</h3>
						<p class="text-red-500">Open Tickets</p>
					</div>
				</div>
			</section>
		</div>
		<div class="card">
			<section class="flex justify-evenly p-4">
				<div class="w-10 mr-4 flex items-center text-green-500">
					<FaRegThumbsUp />
				</div>
				<div>
					<div class="flex flex-col text-center">
						<h3 class="text-xl text-green-500">34</h3>
						<p class="text-green-500">Closed Tickets</p>
					</div>
				</div>
			</section>
		</div>
        <div class="col-span-2 card">hi</div>
        <div class="card">
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Tech</th>
                            <th>Total</th>
                            <th>Open</th>
                            <th>Closed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- {#each tableArr as row, i}
                            <tr>
                                <td>{row.position}</td>
                                <td>{row.name}</td>
                                <td>{row.symbol}</td>
                                <td>{row.weight}</td>
                            </tr>
                        {/each} -->
                    </tbody>
                </table>
            </div>
        </div>
	</div>
</div>
<div class="flex flex-wrap justify-center" />
