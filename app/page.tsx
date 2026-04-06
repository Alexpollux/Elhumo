import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import Menu from '@/components/home/Menu'
import Reservation from '@/components/home/Reservation'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      items: {
        orderBy: { order: 'asc' },
      },
    },
  })

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Menu categories={categories} />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}
