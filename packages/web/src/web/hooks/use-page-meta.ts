import { useEffect } from "react";
import { absoluteUrl, DEFAULT_SOCIAL_IMAGE, type PageSeo } from "../../shared/seo";

/** Atualiza o head em navegações SPA; o build usa os mesmos dados no HTML inicial. */
export function usePageMeta(seo: PageSeo) {
  useEffect(() => {
    document.title = seo.title;
    const setMeta = (kind: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(kind, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    setMeta("name", "description", seo.description);
    const isPreview = document.documentElement.dataset.siteNoindex === "true";
    setMeta(
      "name",
      "robots",
      seo.noindex || isPreview ? "noindex, follow" : "index, follow, max-image-preview:large",
    );
    setMeta("property", "og:locale", "pt_BR");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Nany");
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:image", absoluteUrl(seo.image ?? DEFAULT_SOCIAL_IMAGE));
    setMeta("property", "og:image:alt", seo.imageAlt ?? "Nany em Guarapuava");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", absoluteUrl(seo.image ?? DEFAULT_SOCIAL_IMAGE));
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let ogUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (seo.path) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = absoluteUrl(seo.path);
      setMeta("property", "og:url", absoluteUrl(seo.path));
    } else {
      canonical?.remove();
      ogUrl?.remove();
    }
    let structured = document.getElementById("structured-data");
    if (seo.structuredData?.length) {
      if (!structured) {
        structured = document.createElement("script");
        structured.id = "structured-data";
        structured.setAttribute("type", "application/ld+json");
        document.head.appendChild(structured);
      }
      structured.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": seo.structuredData,
      });
    } else structured?.remove();
  }, [seo]);
}
