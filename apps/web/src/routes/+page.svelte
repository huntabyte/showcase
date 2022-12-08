<script>
	import { ProjectCard } from '$lib/components';
	export let data;
</script>

<div class="flex flex-col gap-3">
	<h1 class="text-xl font-bold">Recent Projects</h1>
	<div class="grid grid-cols-3 gap-2">
		{#each data.projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</div>
