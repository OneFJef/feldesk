import { redirect, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');

	const activeTickets = await prisma.ticket.findMany({
		where: {
			status: { in: ['OPEN', 'WORKING'] },
			OR: [{ owner: { some: { id: user.userId } } }, { agent: { some: { id: user.userId } } }]
		},
		include: { owner: true, agent: true }
	});

	const closedTickets = await prisma.ticket.findMany({
		where: {
			status: { in: 'CLOSED' },
			OR: [{ owner: { some: { id: user.userId } } }, { agent: { some: { id: user.userId } } }]
		},
		include: { owner: true, agent: true }
	});

	return {
		user,
		activeTickets,
		closedTickets
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	signOut: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
};
