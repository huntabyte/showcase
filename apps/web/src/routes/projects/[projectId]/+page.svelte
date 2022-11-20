<script>
	import { getImageURL } from '$lib/utils';
	export let data;
</script>

<div class="flex flex-col w-full mt-4">
	<div class="avatar">
		<div class="w-20 rounded">
			<img
				src={data.project?.thumbnail
					? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail, '80x80')
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data.project.name}`}
				alt="project thumbnail"
			/>
		</div>
	</div>
	<h1 class="text-2xl font-bold mt-4">
		{data.project.name}
	</h1>
	<p class="text-2xl font-light mt-2">{data.project.tagline}</p>
	<p>{data.project.description}</p>
</div>
