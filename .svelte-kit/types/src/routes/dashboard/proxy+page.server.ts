// @ts-nocheck
import { redirect, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import prisma from '$lib/server/prisma.js';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');

	const activeTickets = await prisma.ticket.findMany({
		where: { status: { in: ['OPEN', 'WORKING'] }, authUser: { some: { id: user.userId } } },
		include: { authUser: { orderBy: { role: 'desc' } } }
	});

	const closedTickets = await prisma.ticket.findMany({
		where: { status: { in: 'CLOSED' }, authUser: { some: { id: user.userId } } },
		include: { authUser: { orderBy: { role: 'desc' } } }
	});

	return {
		user,
		activeTickets,
		closedTickets
	};
};

/** */
export const actions = {
	signOut:/** @param {import('./$types').RequestEvent} event */  async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
};
