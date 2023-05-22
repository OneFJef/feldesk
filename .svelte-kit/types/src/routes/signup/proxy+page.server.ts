// @ts-nocheck
import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};

/** */
export const actions = {
	default:/** @param {import('./$types').RequestEvent} event */  async ({ request, locals }) => {
		const form = await request.formData();
		const name = form.get('name');
		const email = form.get('email');
		const password = form.get('password');
		if (
			!name ||
			!email ||
			!password ||
			typeof name !== 'string' ||
			typeof email !== 'string' ||
			typeof password !== 'string'
		) {
			return fail(400, {
				message: 'Invalid input.'
			});
		}
		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'email',
					providerUserId: email,
					password
				},
				attributes: {
					email,
					name
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2002' &&
				error.message?.includes('email')
			) {
				return fail(400, {
					message: 'Email already in use.'
				});
			}
			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					message: 'Email already in use.'
				});
			}
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred.'
			});
		}
	}
};
