import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const withMdx = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
};

export default withMdx(nextConfig);
