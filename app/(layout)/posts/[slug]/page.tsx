import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ServerMdx } from "@/features/markdown/server-mdx";
import { Layout, LayoutContent } from "@/features/page/layout";
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
      url: `https://unlcoaching.com/posts/${params.slug}`,
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

  if (
    post.attributes.status === "draft" &&
    process.env.NODE_ENV === "production"
  ) {
    logger.warn(`Post "${post.attributes.title}" is a draft`);
    return notFound();
  }

  const postTags = post.attributes.keywords;

  return (
    <Layout size="xl">
      <LayoutContent className="mx-auto max-w-7xl py-6">
        {/* 1. Bouton Retour */}
        <Link className={buttonVariants({ variant: "link" })} href="/posts">
          <ArrowLeft size={14} className="mr-2" />
          Retour
        </Link>

        {/* 2. Titre */}
        <div className="mt-8 flex flex-col items-center text-center">
          <h1 className="max-w-6xl text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
            {post.attributes.title}
          </h1>

          {/* 3. Infos (Date & Auteur) */}
          <div className="mt-6 text-sm text-muted-foreground">
            {formatDate(new Date(post.attributes.date))} · Créé par{" "}
            <Link
              href={SiteConfig.team.website}
              className="text-orange-500 hover:underline"
            >
              {SiteConfig.team.name}
            </Link>
          </div>

          {/* 4. Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {postTags.map((tag: string, index: number) => (
              <div key={tag} className="flex items-center">
                <Link
                  href={{ pathname: `/posts`, query: { tag } }}
                  className="rounded-md border border-orange-500/50 px-3 py-1 text-xs font-medium transition-colors hover:bg-orange-500/10"
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

        {/* 5. Image hero */}
        <div className="mt-12 w-full overflow-hidden rounded-md border border-white/10 bg-muted">
          <img
            src={post.attributes.coverUrl}
            alt={post.attributes.title}
            className="aspect-video w-full object-cover"
          />
        </div>

        <Separator className="my-12 opacity-20" />

        {/* 6. Contenu article */}
        <div className="mx-auto max-w-5xl">
          <ServerMdx
            className="
              prose prose-invert max-w-none

              prose-headings:font-bold prose-headings:text-white
              prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:text-white
              prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:text-white/90

              prose-p:text-white/80 prose-p:leading-7

              prose-strong:text-white
              prose-em:text-white/80

              prose-li:text-white/80
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6

              prose-blockquote:border-l-4 prose-blockquote:border-orange-500
              prose-blockquote:text-white/70 prose-blockquote:pl-4

              prose-table:w-full prose-table:border-collapse
              prose-th:border prose-th:border-white/10 prose-th:bg-white/5
              prose-th:p-3 prose-th:text-left prose-th:text-orange-400
              prose-td:border prose-td:border-white/10 prose-td:p-3 prose-td:text-white/80

              prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline

              prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5
              prose-code:py-0.5 prose-code:text-orange-300
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
            "
            source={post.content}
          />
        </div>
      </LayoutContent>
    </Layout>
  );
}