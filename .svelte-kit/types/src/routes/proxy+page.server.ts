// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (user) throw redirect(302, '/dashboard');
	return {
		user
	};
};
