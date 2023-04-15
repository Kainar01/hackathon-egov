import { PrismaClient } from '@prisma/client';
const egovRows = require('./data/egov');

const prisma = new PrismaClient();

function mapEgovRowToRequest(egovRow: typeof egovRows[0]) {
  const request = {
    requestCode: egovRow.requestId,
    serviceCode: egovRow.serviceType.code,
    serviceName: egovRow.serviceType.nameRu,
    createdAt: new Date(egovRow.statusDate),
  };

  return request;
}

async function main() {
  const requests = egovRows.map(mapEgovRowToRequest);
  await prisma.request.createMany({ data: requests });
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
