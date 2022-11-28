import { error, invalid, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { createProjectSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();

		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}
		body.append('user', locals.user.id);

		const { formData, errors } = await validateData(body, createProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('projects').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/projects');
	}
};
