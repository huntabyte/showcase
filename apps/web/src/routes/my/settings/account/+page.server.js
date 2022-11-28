import { error, invalid } from '@sveltejs/kit';
import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	updateEmail: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateEmailSchema);

		if (errors) {
			return invalid(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').requestEmailChange(formData.email);
		} catch (err) {
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateUsernameSchema);

		if (errors) {
			return invalid(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${formData.username}"`);
		} catch (err) {
			if (err.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals.user.id, { username: formData.username });
					locals.user.username = username;
					return {
						success: true
					};
				} catch (err) {
					console.log('Error: ', err);
					throw error(err.status, err.message);
				}
			}
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}
};
