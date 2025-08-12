import { PrismaClient } from '../generated/prisma';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // --- User creation ---
  const users = await Promise.all(
    Array.from({ length: 3 }).map(async () =>
      prisma.user.create({
        data: {
          id: uuidv4(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          provider: '',
          emailVerified: faker.datatype.boolean(),
          twofaVerified: faker.datatype.boolean(),
          verificationToken: faker.datatype.boolean() ? faker.string.uuid() : null,
          speakeasySecret: faker.datatype.boolean() ? faker.string.uuid() : null,
          lastLoginIp: faker.internet.ip(),
          lastKnownDevice: faker.commerce.productName(),
          geoData: {
            create: {
              id: uuidv4(),
              country: faker.location.country(),
              region: faker.location.state(),
              timezone: faker.location.timeZone(),
              city: faker.location.city(),
            },
          },
        },
      }),
    ),
  );

  // --- Admin creation ---
  const admins = await Promise.all(
    users.slice(0, 1).map(async (user) =>
      prisma.admin.create({
        data: {
          id: uuidv4(),
          username: faker.internet.userName(),
          fullname: faker.person.fullName(),
          userId: user.id,
        },
      }),
    ),
  );

  // --- Audience creation ---
  const audiences = await Promise.all(
    users.slice(1, 2).map(async (user) =>
      prisma.audience.create({
        data: {
          id: uuidv4(),
          username: faker.internet.userName(),
          fullname: faker.person.fullName(),
          userId: user.id,
        },
      }),
    ),
  );

  // --- Organizer creation ---
  const organizers = await Promise.all(
    users.slice(2, 3).map(async (user) =>
      prisma.organizer.create({
        data: {
          id: uuidv4(),
          username: faker.internet.userName(),
          fullname: faker.person.fullName(),
          userId: user.id,
          // role is nullable, so we can omit or set to null
        },
      }),
    ),
  );

  // --- Venue creation ---
  const venues = await Promise.all(
    Array.from({ length: 3 }).map(async () =>
      prisma.venue.create({
        data: {
          id: uuidv4(),
          name: faker.company.name(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
          capacity: faker.number.int({ min: 100, max: 10000 }),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      }),
    ),
  );

  // --- OrganizerOnVenue creation ---
  await Promise.all(
    organizers.map((organizer, i) =>
      prisma.organizerOnVenue.create({
        data: {
          organizerId: organizer.id,
          venueId: venues[i % venues.length].id,
        },
      }),
    ),
  );

  // --- Event creation ---
  const events = await Promise.all(
    Array.from({ length: 3 }).map(async (_, i) =>
      prisma.event.create({
        data: {
          id: uuidv4(),
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          category: ['MUSIC', 'TECH', 'SPORT'][i % 3] as any,
          organizerId: organizers[0].id,
          startTime: faker.date.future(),
          endTime: faker.date.future(),
          venueId: venues[i % venues.length].id,
        },
      }),
    ),
  );

  // --- TicketType creation ---
  const ticketTypes = await Promise.all(
    events.map((event, i) =>
      prisma.ticketType.create({
        data: {
          id: uuidv4(),
          eventId: event.id,
          name: ['VIP', 'REGULAR', 'STUDENT', 'VVIP'][i % 4] as any,
          price: faker.number.int({ min: 10, max: 200 }),
        },
      }),
    ),
  );

  // --- Ticket creation ---
  await Promise.all(
    events.map((event, i) =>
      prisma.ticket.create({
        data: {
          id: uuidv4(),
          eventId: event.id,
          typeId: ticketTypes[i].id,
          qrcode: faker.string.uuid(),
          isUsed: faker.datatype.boolean(),
          audienceId: audiences[0]?.id ?? "", // Link to an audience, or empty string if none
        },
      }),
    ),
  );

  // --- Order creation ---
  const orders = await Promise.all(
    Array.from({ length: 3 }).map(async (_, i) =>
      prisma.order.create({
        data: {
          id: uuidv4(),
          item: ['TICKET', 'MERCH'][i % 2] as any,
          total: faker.number.int({ min: 20, max: 500 }),
          itemId: [uuidv4()],
        },
      }),
    ),
  );

  // --- Payment creation ---
  await Promise.all(
    events.map((event, i) =>
      prisma.payment.create({
        data: {
          id: uuidv4(),
          // eventId: event.id,
          amount: faker.number.int({ min: 20, max: 500 }),
          orderId: orders[i].id,
          status: ['PENDING', 'SUCCESSFUL', 'FAILED'][i % 3] as any,
        },
      }),
    ),
  );

  // --- Session creation ---
  await Promise.all(
    users.map((user) =>
      prisma.session.create({
        data: {
          id: uuidv4(),
          userId: user.id,
          rememberToken: faker.string.uuid(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      }),
    ),
  );

  console.log('Mock data generated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });