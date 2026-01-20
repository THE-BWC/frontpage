import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Hero } from '@/components/blocks/Hero'
import { Content } from '@/components/blocks/Content'
import { Timeline } from '@/components/blocks/Timeline'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/Motion'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch Home Page (for user-managed Hero/Intro)
  const homePromise = payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })

  // 2. Fetch Latest News
  const newsPromise = payload.find({
    collection: 'news',
    limit: 3,
    sort: '-publishedDate',
  })

  // 3. Fetch Featured Games
  const gamesPromise = payload.find({
    collection: 'games',
    limit: 3,
    sort: 'title',
  })

  const [homeResult, newsResult, gamesResult] = await Promise.all([
    homePromise,
    newsPromise,
    gamesPromise
  ])

  const homePage = homeResult.docs[0]

  return (
    <div className="bg-background min-h-screen">
      {/* 1. CMS Managed Blocks (Hero, etc) */}
      {homePage?.layout?.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <Hero key={index} {...block} />
          case 'content':
            return <Content key={index} {...block} />
          case 'timeline':
            return <Timeline key={index} {...block} />
          default:
            return null
        }
      })}

      {/* 2. Latest Intel (News) */}
      <section className="py-12 px-4 md:px-8">
        <div className='max-w-7xl mx-auto'>
          <div className="flex items-center justify-between mb-12">
            <FadeIn>
              <h2 className="text-3xl font-black uppercase tracking-wider text-white">
                Latest News
              </h2>
              <div className="h-1 w-12 bg-primary mt-2 rounded-full" />
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link href="/news" className="text-primary hover:text-primary-hover text-sm font-bold uppercase tracking-widest transition-colors flex items-center">
                View All <span className="ml-2">&rarr;</span>
              </Link>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsResult.docs.map((post) => {
              const coverUrl = typeof post.coverImage === 'object' && post.coverImage?.url ? post.coverImage.url : null
              const date = new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

              return (
                <StaggerItem key={post.id} className="h-full">
                  <Link href={`/news/${post.slug}`} className="group block h-full bg-card border border-white/5 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300">
                    <div className="relative h-48 w-full overflow-hidden">
                      {coverUrl ? (
                        <Image src={coverUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <span className="text-white/20 font-bold uppercase tracking-widest">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-primary text-xs font-bold uppercase tracking-widest">{date}</span>
                      <h3 className="text-xl font-bold text-white mt-2 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <span className="text-gray-400 text-sm border-b border-primary/0 group-hover:border-primary transition-all">Read Briefing</span>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Active Operations (Games) */}
      <section className="py-12 px-4 md:px-8 bg-card/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <FadeIn>
              <h2 className="text-3xl font-black uppercase tracking-wider text-white">
                Active Games
              </h2>
              <div className="h-1 w-12 bg-primary mt-2 rounded-full" />
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link href="/games" className="text-primary hover:text-primary-hover text-sm font-bold uppercase tracking-widest transition-colors flex items-center">
                All Games <span className="ml-2">&rarr;</span>
              </Link>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gamesResult.docs.map((game) => {
              const coverUrl = typeof game.coverImage === 'object' && game.coverImage?.url ? game.coverImage.url : null
              return (
                <StaggerItem key={game.id}>
                  <div className="group relative h-64 rounded-lg overflow-hidden border border-white/5 hover:border-primary transition-colors">
                    {coverUrl && (
                      <Image src={coverUrl} alt={game.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-40" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="text-primary text-xs font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur mb-2 inline-block">
                        {game.genre}
                      </span>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                        {game.title}
                      </h3>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}
