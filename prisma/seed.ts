import { PrismaClient } from '@prisma/client';
const egovRows = require('./data/egov');
const adminRows = require('./data/admin');

const prisma = new PrismaClient();

function mapEgovRowToRequest(egovRow: typeof egovRows[0]) {
  const request = {
    requestCode: egovRow.requestId,
    serviceCode: egovRow.serviceType.code,
    serviceName: egovRow.serviceType.nameRu,
    organizationName: egovRow.organization.nameRu,
    organizationLat: egovRow.organization.lat,
    organizationLng: egovRow.organization.lng,
    createdAt: new Date(egovRow.statusDate),
  };

  return request;
}

async function main() {
  const requests = egovRows.map(mapEgovRowToRequest);
  await prisma.request.createMany({ data: requests });

  await prisma.user.createMany({ data: adminRows });

  const users = await prisma.user.findMany({ where: { OR: adminRows } });

  const roles = users.map(({ id: userId }) => ({ userId, role: 'admin' }));
  await prisma.userRole.createMany({ data: roles });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
