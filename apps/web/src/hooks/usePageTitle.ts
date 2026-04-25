import { useEffect } from "react";

const DEFAULT_SITE_NAME = "Findable";

export function usePageTitle(title?: string, siteName: string = DEFAULT_SITE_NAME) {
  useEffect(() => {
    document.title = title ? `${title} — ${siteName}` : siteName;
    return () => {
      document.title = siteName;
    };
  }, [title, siteName]);
}
