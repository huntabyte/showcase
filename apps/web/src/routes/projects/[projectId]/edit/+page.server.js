import { error, invalid, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs, validateData } from '$lib/utils';
import { updateProjectSchema } from '$lib/schemas';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const project = serializeNonPOJOs(
			await locals.pb.collection('projects').getOne(params.projectId)
		);

		if (locals.user.id === project.user) {
			return {
				project
			};
		} else {
			throw error(403, 'Forbidden');
		}
	} catch (err) {
		console.log('Error: ', err);
		throw error(err.status, err.message);
	}
};

export const actions = {
	updateProject: async ({ request, locals, params }) => {
		const body = await request.formData();

		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, updateProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('projects').update(params.projectId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/my/projects`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('projects').update(params.projectId, { thumbnail: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
