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

  if (post.attributes.status === "draft" && process.env.NODE_ENV === "production") {
    logger.warn(`Post "${post.attributes.title}" is a draft`);
    return notFound();
  }

  const postTags = post.attributes.keywords;

  return (
    <Layout size="xl">
      <LayoutContent className="mx-auto max-w-7xl py-6">
        {/* Retour */}
        <Link className={buttonVariants({ variant: "link" })} href="/posts">
          <ArrowLeft size={14} className="mr-2" />
          Retour
        </Link>

        {/* Titre */}
        <div className="mt-8 flex flex-col items-center text-center">
          <h1 className="max-w-6xl text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
            {post.attributes.title}
          </h1>
          <div className="mt-6 text-sm text-muted-foreground">
            {formatDate(new Date(post.attributes.date))} · Créé par{" "}
            <Link href={SiteConfig.team.website} className="text-orange-500 hover:underline">
              {SiteConfig.team.name}
            </Link>
          </div>
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

        {/* Image hero */}
        <div className="mt-12 w-full overflow-hidden rounded-md border border-white/10 bg-muted">
          <img
            src={post.attributes.coverUrl}
            alt={post.attributes.title}
            className="aspect-video w-full object-cover"
          />
        </div>

        <Separator className="my-12 opacity-20" />

        {/* Contenu article — styles inline via article tag */}
        <article className="mx-auto max-w-5xl">
          <ServerMdx
            className="
              [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white
              [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white/90
              [&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-white/80
              [&_p]:mb-4 [&_p]:text-base [&_p]:leading-7 [&_p]:text-white/80
              [&_strong]:font-bold [&_strong]:text-white
              [&_em]:italic [&_em]:text-white/80
              [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mb-1 [&_li]:text-white/80
              [&_a]:text-orange-400 [&_a]:no-underline hover:[&_a]:underline
              [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-4 [&_blockquote]:text-white/70
              [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse
              [&_th]:border [&_th]:border-white/10 [&_th]:bg-white/5 [&_th]:p-3 [&_th]:text-left [&_th]:text-orange-400
              [&_td]:border [&_td]:border-white/10 [&_td]:p-3 [&_td]:text-white/80
              [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-orange-300
              [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-white/5 [&_pre]:p-4
              [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-white/80
              [&_hr]:my-8 [&_hr]:border-white/10
            "
            source={post.content}
          />
        </article>
      </LayoutContent>
    </Layout>
  );
}