import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (user) throw redirect(302, '/dashboard');
	return {
		user
	};
};
