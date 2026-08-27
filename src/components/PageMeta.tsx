import { useEffect } from "react";
import { OFFER_CONFIG } from "../config/offers";

type PageMetaProps = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
};

const upsertMeta = (selector: string, create: () => HTMLMetaElement) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    return existing;
  }

  const element = create();
  document.head.appendChild(element);
  return element;
};

export function PageMeta({ title, description, path = "/", noindex = false }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    const absoluteUrl = `${OFFER_CONFIG.site.siteUrl}${path}`;

    const descriptionMeta = upsertMeta('meta[name="description"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("name", "description");
      return element;
    });
    descriptionMeta.setAttribute("content", description);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = absoluteUrl;
    }

    const robots = upsertMeta('meta[name="robots"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("name", "robots");
      return element;
    });
    robots.setAttribute("content", noindex ? "noindex,nofollow" : "index,follow");

    const openGraphTitle = upsertMeta('meta[property="og:title"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("property", "og:title");
      return element;
    });
    openGraphTitle.setAttribute("content", title);

    const openGraphDescription = upsertMeta('meta[property="og:description"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("property", "og:description");
      return element;
    });
    openGraphDescription.setAttribute("content", description);

    const openGraphUrl = upsertMeta('meta[property="og:url"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("property", "og:url");
      return element;
    });
    openGraphUrl.setAttribute("content", absoluteUrl);

    const twitterTitle = upsertMeta('meta[name="twitter:title"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("name", "twitter:title");
      return element;
    });
    twitterTitle.setAttribute("content", title);

    const twitterDescription = upsertMeta('meta[name="twitter:description"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("name", "twitter:description");
      return element;
    });
    twitterDescription.setAttribute("content", description);
  }, [description, noindex, path, title]);

  return null;
}
