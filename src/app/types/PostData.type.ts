// To handle the post data for multiple components
export type PostData = {
  id: string;
  date: string;
  title: string;
  previewImage?: string;
  tags?: string[];
  summary?: string; // Added summary for metadata type safety
  contentHtml?: string;
};
