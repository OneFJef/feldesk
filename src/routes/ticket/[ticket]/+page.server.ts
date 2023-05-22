import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, params }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');

	const ticket = await prisma.ticket.findUnique({
		where: { id: Number(params.ticket) },
		include: { owner: true, agent: true }
	});

	const note = await prisma.note.findMany({
		where: { ticketId: { in: Number(params.ticket) } },
		include: { AuthUser: true },
		orderBy: { createdAt: 'desc' }
	});

	return {
		user,
		ticket,
		note
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	openTicket: async ({ locals, params }) => {
		const { user } = await locals.auth.validateUser();

		await prisma.ticket.update({
			where: { id: Number(params.ticket) },
			data: { status: 'OPEN' }
		});

		const content: string = `Ticket marked as OPEN.`;

		await prisma.note.create({
			data: {
				content,
				ticketId: Number(params.ticket),
				authUserId: user?.userId
			}
		});
	},

	closeTicket: async ({ locals, params }) => {
		const { user } = await locals.auth.validateUser();

		if (user?.role !== 'USER') {
			await prisma.ticket.update({
				where: { id: Number(params.ticket) },
				data: {
					status: 'CLOSED',
					agent: { connect: { id: user?.userId } }
				}
			});
		} else {
			await prisma.ticket.update({
				where: { id: Number(params.ticket) },
				data: { status: 'CLOSED' }
			});
		}

		const content: string = `Ticket marked as CLOSED.`;

		await prisma.note.create({
			data: {
				content,
				ticketId: Number(params.ticket),
				authUserId: user?.userId
			}
		});
	},

	note: async ({ request, locals, params }) => {
		const { user } = await locals.auth.validateUser();
		const form = await request.formData();
		let content: any = form.get('note');

		if (!content) {
			return fail(400, { content, missing: true });
		}

		await prisma.note.create({
			data: {
				content,
				ticketId: Number(params.ticket),
				authUserId: user?.userId
			}
		});
	},

	signOut: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
};
