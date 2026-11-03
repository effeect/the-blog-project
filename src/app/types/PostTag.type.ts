// A tag that appears on at least one post, as offered by the tag search
export type PostTag = {
  slug: string; // The value used in ?tag= links
  label: string;
  count: number;
};
