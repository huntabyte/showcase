import { error, invalid, redirect } from '@sveltejs/kit';
import { updatePasswordSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	updatePassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updatePasswordSchema);

		if (errors) {
			return invalid(400, {
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
			locals.pb.authStore.clear();
		} catch {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/login');
	}
};
