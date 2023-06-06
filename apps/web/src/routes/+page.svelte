<script>
	import { ProjectCard } from '$lib/components';
	export let data;
</script>

<div class="flex flex-col gap-3">
	<h1 class="text-xl font-bold">Recent Projects</h1>
	<div class="flex justify-center">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
			{#each data.projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</div>
