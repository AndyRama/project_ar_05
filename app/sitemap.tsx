import { getPosts } from "@/features/posts/post-manager";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    {
      url: "https://unlcoaching.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://unlcoaching.com/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://unlcoaching.com/home",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    ...posts.map(
      (post) =>
        ({
          url: `https://unlcoaching.com/posts/${post.slug}`,
          lastModified: new Date(post.attributes.date),
          changeFrequency: "monthly",
        }) as const,
    ),
  ];
}
