import Hero from '@/components/sections/Hero'
import FeaturedSection from '@/components/sections/Featured'
import CategoriesSection from '@/components/sections/Categories'
import Footer from '@/app/layout/Footer'  
import DealsSection from '@/components/sections/Deals'
import FeaturedSetupSection from '@/components/sections/FeaturedSetup'
import WhyChooseSection from '@/components/sections/WhyChoose'
import TestimonialsSection from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSection />
      <CategoriesSection />
      <DealsSection />
      <FeaturedSetupSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}