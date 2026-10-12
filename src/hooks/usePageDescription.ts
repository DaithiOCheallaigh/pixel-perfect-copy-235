import { useEffect } from "react";

// Helmet adds managed tags, but the static crawler fallback also needs the
// current description while a page is mounted. Restore it on navigation.
export const usePageDescription = (description: string) => {
  useEffect(() => {
    const tags = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="description"]:not([data-rh])'));
    const previous = tags.map(tag => tag.content);
    tags.forEach(tag => { tag.content = description; });
    return () => tags.forEach((tag, index) => { tag.content = previous[index]; });
  }, [description]);
};