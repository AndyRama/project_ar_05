import { cn } from "@/lib/utils";
import { Callout } from "@/components/ui/callout";
import { CTABlock } from "@/components/ui/cta-block";
import { CompareTable } from "@/components/ui/compare-table";
import { PriceCard } from "@/components/ui/price-card";
import { FormulaBlock } from "@/components/ui/formula-block";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";

type ServerMdxProps = {
  source: string;
  className?: string;
};

const MdxComponents = {
  Callout,
  CompareTable,
  PriceCard,
  CTABlock,
  FormulaBlock,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<string, React.ComponentType<any>>;

export const ServerMdx = (props: ServerMdxProps) => {
  return (

    <div className={props.className}>
      <MDXRemote
        source={props.source}
        components={MdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [rehypePrismPlus, { ignoreMissing: true }],
              rehypeSlug,
              rehypeAutolinkHeadings,
            ],
            format: "mdx",
          },
        }}
      />
    </div>
  );
};