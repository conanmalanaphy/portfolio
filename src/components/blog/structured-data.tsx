import { BlogPostType } from '@/lib/schemas/blog-post-native';

interface StructuredDataProps {
  post: BlogPostType;
  slug: string;
}

/**
 * Structured data component for blog posts (JSON-LD)
 */
export default function StructuredData({ post, slug }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage ? [post.featuredImage] : ["https://malanaphy.co.uk/icon.png"],
    "author": {
      "@type": "Person",
      "name": "Conan Malanaphy",
      "url": "https://malanaphy.co.uk",
      "sameAs": [
        "https://github.com/conanmalanaphy/",
        "https://www.linkedin.com/in/conan-malanaphy-946260a7/"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Conan Malanaphy",
      "url": "https://malanaphy.co.uk"
    },
    "datePublished": post.publishedAt?.toISOString(),
    "dateModified": post.updatedAt?.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://malanaphy.co.uk/blog/${slug}`
    },
    "url": `https://malanaphy.co.uk/blog/${slug}`,
    "keywords": post.tags.join(", "),
    "articleSection": "Technology",
    "wordCount": post.content.replace(/<[^>]*>/g, '').split(' ').length,
    "inLanguage": "en-GB"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
