import { Typography } from "@/components/nowts/typography";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ServerMdx } from "@/features/markdown/server-mdx";
import {
  Layout,
  LayoutContent,
  // LayoutDescription,
  // LayoutHeader,
  // LayoutTitle,
} from "@/features/page/layout";
// import { calculateReadingTime } from "@/features/posts/calculate-reading-time";
import type { PostParams } from "@/features/posts/post-manager";
import { getCurrentPost, getPosts } from "@/features/posts/post-manager";
import { formatDate } from "@/lib/format/date";
import { logger } from "@/lib/logger";
import { SiteConfig } from "@/site-config";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata(props: PostParams): Promise<Metadata> {
  const params = await props.params;
  const post = await getCurrentPost(params.slug);
  if (!post) return notFound();

  return {
    title: post.attributes.title,
    description: post.attributes.description,
    openGraph: {
      title: post.attributes.title,
      description: post.attributes.description,
      url: `https://codeline.app/posts/${params.slug}`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function RoutePage(props: PostParams) {
  const params = await props.params;
  const post = await getCurrentPost(params.slug);

  if (!post) return notFound();

  if (post.attributes.status === "draft" && process.env.VERCEL_ENV === "production") {
    logger.warn(`Post "${post.attributes.title}" is a draft`);
    return notFound();
  }

  const postTags = post.attributes.keywords;

  return (
    <Layout>
      <LayoutContent className="max-w-7xl mx-auto py-6">
      {/* 1. Bouton Retour */}
        <Link className={buttonVariants({ variant: "link" })} href="/posts">
          <ArrowLeft size={14} className="mr-2" />Retour
        </Link>

        {/* 2. Titre */}
        <div className="mt-8 flex flex-col items-center text-center">
          <h1 className="max-w-6xl text-4xl font-extrabold tracking-tight lg:text-5xl">
            {post.attributes.title}
          </h1>

          {/* 3. Infos (Date & Auteur) */}
          <div className="mt-6 text-sm text-muted-foreground">
            {formatDate(new Date(post.attributes.date))} · Crée par {" "}
            <Link href={SiteConfig.team.website} className="text-orange-500 hover:underline">
              {SiteConfig.team.name}
            </Link>
          </div>

          {/* 4. Tags avec séparateur | */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            {postTags.map((tag: string, index: number) => (
              <div key={tag} className="flex items-center">
                <Link
                  href={{ pathname: `/posts`, query: { tag: tag } }}
                  className="px-3 py-1 rounded-full border border-orange-500/50 text-xs font-medium hover:bg-orange-500/10 transition-colors"
                >
                  {tag}
                </Link>
                {index < postTags.length - 1 && (
                  <span className="ml-3 text-muted-foreground/30">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5. Grosse Image (Hero) */}
        <div className="mt-12 w-full overflow-hidden rounded-md border border-white/10 bg-muted">
           <img 
            src={post.attributes.coverUrl} 
            alt={post.attributes.title}
            className="w-full aspect-video object-unset"
          />
        </div>

        <Separator className="my-12 opacity-20" />

        {/* 6. Contenu Article */}
        <div className="max-w-5xl mx-auto">
         <ServerMdx
            className="prose prose-invert max-w-none
              prose-headings:text-white
              prose-h2:text-white prose-h2:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-white/90
              prose-p:text-white/80
              prose-strong:text-white
              prose-li:text-white/80
              prose-blockquote:border-orange-500 prose-blockquote:text-white/70
              prose-th:text-orange-400 prose-th:bg-white/5 prose-th:p-4
              prose-td:p-4 prose-td:text-white/80
              prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
              prose-code:text-orange-300"
            source={post.content}
          />
        </div>
      </LayoutContent>
    </Layout>
  );
}