import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL! })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding El Humo...')

  // Nettoyage
  await prisma.menuItem.deleteMany()
  await prisma.category.deleteMany()

  // Catégories
  const tacos = await prisma.category.create({
    data: { name: 'Tacos', slug: 'tacos', order: 1 },
  })
  const burritos = await prisma.category.create({
    data: { name: 'Burritos', slug: 'burritos', order: 2 },
  })
  const quesadillas = await prisma.category.create({
    data: { name: 'Quesadillas', slug: 'quesadillas', order: 3 },
  })
  const dulces = await prisma.category.create({
    data: { name: 'Dulces', slug: 'dulces', order: 4 },
  })

  // Tacos
  await prisma.menuItem.createMany({
    data: [
      { name: 'Al Pastor', description: 'Porc mariné aux ananas, coriandre et oignon rouge', price: 4.5, categoryId: tacos.id, order: 1 },
      { name: 'Carnitas', description: 'Porc effiloché confit, salsa verde, radis et citron vert', price: 4.5, categoryId: tacos.id, order: 2 },
      { name: 'Pollo Grillé', description: 'Poulet grillé aux épices chipotle, avocat et pico de gallo', price: 4.5, categoryId: tacos.id, order: 3 },
      { name: 'Légumes Rôtis', description: 'Poivrons, courgettes et maïs rôtis, crème de haricots noirs', price: 4.0, categoryId: tacos.id, order: 4 },
    ],
  })

  // Burritos
  await prisma.menuItem.createMany({
    data: [
      { name: 'Classique Bœuf', description: 'Bœuf haché épicé, riz, haricots noirs, cheddar et salsa rouge', price: 10.5, categoryId: burritos.id, order: 1 },
      { name: 'Poulet Chipotle', description: 'Poulet chipotle, riz à la coriandre, guacamole et crème fraîche', price: 10.5, categoryId: burritos.id, order: 2 },
      { name: 'Végétarien', description: 'Légumes rôtis, riz, haricots rouges, cheddar et salsa verde', price: 9.5, categoryId: burritos.id, order: 3 },
    ],
  })

  // Quesadillas
  await prisma.menuItem.createMany({
    data: [
      { name: 'Fromage & Jalapeños', description: 'Mélange de fromages fondus, jalapeños frais et crème épicée', price: 8.0, categoryId: quesadillas.id, order: 1 },
      { name: 'Poulet & Avocat', description: 'Poulet grillé, avocat crémeux, tomates séchées et mozzarella', price: 9.0, categoryId: quesadillas.id, order: 2 },
      { name: 'Champignons & Chèvre', description: 'Champignons sautés à l\'ail, fromage de chèvre et herbes fraîches', price: 8.5, categoryId: quesadillas.id, order: 3 },
    ],
  })

  // Dulces
  await prisma.menuItem.createMany({
    data: [
      { name: 'Mini Burritos Nutella-Banane', description: 'Tortillas croustillantes fourrées au Nutella et banane caramélisée', price: 5.5, categoryId: dulces.id, order: 1 },
      { name: 'Mini Burritos Dulce de Leche', description: 'Tortillas dorées, caramel de lait argentin et noix de pécan', price: 5.5, categoryId: dulces.id, order: 2 },
      { name: 'Mini Burritos Fraise-Mascarpone', description: 'Fraises fraîches, mascarpone vanillé et coulis de fruits rouges', price: 5.5, categoryId: dulces.id, order: 3 },
    ],
  })

  console.log('✅ Seed terminé !')
  console.log('   - 4 catégories créées')
  console.log('   - 13 plats créés')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
