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

    const descriptionMeta = upsertMeta('meta[name="description"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("name", "description");
      return element;
    });
    descriptionMeta.setAttribute("content", description);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `${OFFER_CONFIG.site.siteUrl}${path}`;
    }

    const robots = upsertMeta('meta[name="robots"]', () => {
      const element = document.createElement("meta");
      element.setAttribute("name", "robots");
      return element;
    });
    robots.setAttribute("content", noindex ? "noindex,nofollow" : "index,follow");
  }, [description, noindex, path, title]);

  return null;
}
