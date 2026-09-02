import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Activities from '@/components/home/Activities'
import BlogPreview from '@/components/home/BlogPreview'
import Team from '@/components/home/Team'
import Partners from '@/components/home/Partners'
import Contact from '@/components/home/Contact'
import { getFeaturedArticles } from '@/lib/articles'

// Page statique régénérée au plus toutes les heures, et immédiatement après toute
// modification d'article dans l'admin (invalidation par tag).
export const revalidate = 3600

export default async function HomePage() {
  const articles = await getFeaturedArticles(3)

  return (
    <>
      <Hero />
      <About />
      <Activities />
      <BlogPreview articles={articles} />
      <Team />
      <Partners />
      <Contact />
    </>
  )
}
