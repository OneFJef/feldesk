// @ts-nocheck
import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/dashboard');
	return {};
};

/** */
export const actions = {
	default:/** @param {import('./$types').RequestEvent} event */  async ({ request, locals }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');
		if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid input'
			});
		}
		try {
			const key = await auth.useKey('email', email, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (error) {
			if (
				error instanceof LuciaError &&
				(error.message === 'AUTH_INVALID_KEY_ID' || error.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					message: 'Incorrect email or password.'
				});
			}
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	}
};
