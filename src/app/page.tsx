import { AuroraBackground } from '@/components/ui/AuroraBackground'

export default function Home () {
  return (
    <main className='relative flex flex-col justify-center items-center overflow-hidden mx-auto'>
        <AuroraBackground>
          <h1 className='hero_heading'>
            Welcome to my new portfolio!
            <br />
            This page is still under construction.
          </h1>
        </AuroraBackground>
    </main>
  )
}
