// https://github.com/prisma/prisma-examples/blob/latest/typescript/sveltekit/src/routes/p/%5Bid%5D/%2Bpage.server.ts

import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');

	let userOptions = await prisma.authUser.findMany({
		where: { role: { in: 'USER' } }
	});

	return {
		user,
		userOptions
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		const form = await request.formData();
		let phone: any = form.get('phone');
		let title: any = form.get('title');
		let issue: any = form.get('issue');

		if (!phone || !title || !issue) {
			return fail(400, { title, issue, phone, missing: true });
		}

		await prisma.ticket.create({
			data: {
				phone,
				title,
				issue,
				authUser: { connect: { id: user?.userId } }
			}
		});

		throw redirect(303, `/ticket/`);
	}
};
