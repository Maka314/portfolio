import Hero from '@/components/Hero'
import Projects from '@/components/Projects'

export default function Home () {
  return (
    <main className='relative flex flex-col justify-center items-center overflow-hidden mx-auto'>
      <Hero />
      <Projects />
    </main>
  )
}
