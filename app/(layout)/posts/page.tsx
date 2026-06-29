import { Typography } from "@/components/nowts/typography";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getPosts, getPostsTags } from "@/features/posts/post-manager";
import { SiteConfig } from "@/site-config";
import type { PageParams } from "@/types/next";
import { FileQuestion, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/format/date";
import { calculateReadingTime } from "@/features/posts/calculate-reading-time";
import { RecentPosts } from "@/features/posts/recent-posts";
import { SectionDivider } from "@/features/landing/section-divider";
import { EmailFormSection } from "@/features/email/email-form-section";

export const metadata: Metadata = {
  title: `Blog de ${SiteConfig.title}`,
  description: SiteConfig.description,
  keywords: ["posts"],
  openGraph: {
    title: `${SiteConfig.title}'s Blog`,
    description: SiteConfig.description,
    url: SiteConfig.prodUrl,
    type: "website",
  },
};

export default async function RoutePage(props: PageParams) {
  const tags = await getPostsTags();
  const posts = await getPosts();
  
  // Séparer les articles : 8 featured (1 grand + 7 petits) + le reste dans recent
  const featuredPosts = posts.slice(0, 6);
  const recentPosts = posts.slice(6);

  return (
    <>
      <div className="mt-16"></div>
      <Layout className="max-w-7xl mx-auto px-4 lg:px-6">
        <LayoutHeader>
          <LayoutTitle> Articles tendances</LayoutTitle>
        </LayoutHeader>
        
        {/* Tags */}
        <LayoutContent className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={{
                pathname: `/posts/categories/${tag}`,
              }}
            >
              <Badge variant="outline" className="capitalize">
                {tag}
              </Badge>
            </Link>
          ))}
        </LayoutContent>

        {posts.length === 0 ? (
          <LayoutContent className="flex flex-col items-center justify-center">
            <SectionDivider />
            <div className="flex flex-col items-center rounded-lg border-2 border-dashed p-4 lg:gap-6 lg:p-8">
              <FileQuestion />
              <Typography variant="h2">No posts found</Typography>
              <Link className={buttonVariants({ variant: "link" })} href="/posts">
                Voir tous les postes
              </Link>
            </div>
            <SectionDivider />
          </LayoutContent>
        ) : (
          <>
            {/* ARTICLES TENDANCE - 1 grand à gauche + 6 petits à droite */}
            {featuredPosts.length > 0 && (
              <LayoutContent className="mb-16">
                <div className="space-y-8 max-w-7xl mx-auto">
                              
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {/* Grand article à gauche */}
                    {featuredPosts[0] && (
                      <Link 
                        href={`/posts/${featuredPosts[0].slug}`}
                        className="group block"
                      >
                        <article className="h-full space-y-4">
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                            <div
                              className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                              style={{
                                backgroundImage: `url(${featuredPosts[0].attributes.coverUrl})`,
                              }}
                            />
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {featuredPosts[0].attributes.keywords[0] && (
                              <Badge variant="secondary" className="capitalize">
                                {featuredPosts[0].attributes.keywords[0]}
                              </Badge>
                            )}
                          </div>
                          
                          <Typography 
                            variant="h3" 
                            className="line-clamp-2 text-2xl font-bold group-hover:text-primary transition-colors"
                          >
                            {featuredPosts[0].attributes.title}
                          </Typography>
                          
                          <Typography className="line-clamp-3 text-base text-muted-foreground">
                            {featuredPosts[0].attributes.description}
                          </Typography>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(new Date(featuredPosts[0].attributes.date))}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{calculateReadingTime(featuredPosts[0].content)} min</span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    )}
                    
                    {/* 7 petites cartes empilées à droite */}
                    <div className="flex flex-col gap-6">
                      {featuredPosts.slice(1, 7).map((post) => (
                        <Link 
                          key={post.slug}
                          href={`/posts/${post.slug}`}
                          className="group block"
                        >
                          <article className="flex gap-4">
                            {/* Petite image */}
                            <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                              <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{
                                  backgroundImage: `url(${post.attributes.coverUrl})`,
                                }}
                              />
                            </div>
                            
                            {/* Contenu */}
                            <div className="flex-1 space-y-2">
                              {post.attributes.keywords[0] && (
                                <Badge variant="secondary" className="capitalize text-xs">
                                  {post.attributes.keywords[0]}
                                </Badge>
                              )}
                              
                              <Typography 
                                variant="p" 
                                className="line-clamp-2 text-lg font-bold group-hover:text-primary transition-colors"
                              >
                                {post.attributes.title}
                              </Typography>
                              
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(new Date(post.attributes.date))}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{calculateReadingTime(post.content)} min</span>
                                </div>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </LayoutContent>
            )}

            {/* ARTICLES RÉCENTS - Grille */}
            {recentPosts.length > 0 && (
              <LayoutContent className="max-w-7xl mx-auto">
                <RecentPosts posts={recentPosts} />
                <SectionDivider />
              </LayoutContent>
            )}

            <EmailFormSection />
          </>
        )}
      </Layout>
    </>
  );
}