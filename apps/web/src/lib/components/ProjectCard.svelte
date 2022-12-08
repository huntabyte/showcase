<script>
	import { getImageURL } from '$lib/utils';
	export let project;
</script>

<div class="card w-72 bg-base-100 shadow-xl">
	<figure>
		<img
			src={project?.thumbnail
				? getImageURL(project.collectionId, project.id, project.thumbnail)
				: `https://via.placeholder.com/500/4506CB/FFFFFF/?text=${project.name}`}
			alt="project thumbnail"
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title">{project.name}</h2>
		<p>{project.tagline}</p>
		<div class="card-actions justify-end">
			<a href="/projects/{project.id}" class="btn btn-primary">View Project</a>
		</div>
	</div>
</div>
