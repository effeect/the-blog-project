"use client";

import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getPostsUrl } from "@/app/lib/site";
import { PostTag } from "@/app/types/PostTag.type";

// The selected tag lives in the URL, so results can be linked to and the browser's
// back button works. The server does the filtering when the URL changes.
export default function TagSearch({
  tags,
  selectedSlug,
}: {
  tags: PostTag[];
  selectedSlug?: string;
}) {
  const router = useRouter();

  return (
    <Autocomplete
      data-testid="tag-search"
      options={tags}
      value={tags.find(({ slug }) => slug === selectedSlug) ?? null}
      onChange={(_event, tag) => router.push(getPostsUrl({ tag: tag?.slug }))}
      getOptionLabel={({ label }) => label}
      isOptionEqualToValue={(option, value) => option.slug === value.slug}
      noOptionsText="No matching tags"
      renderOption={({ key, ...optionProps }, { label, count }) => (
        <Box component="li" key={key} {...optionProps}>
          <Box component="span" sx={{ flexGrow: 1 }}>
            {label}
          </Box>
          <Typography variant="body2" component="span" color="text.secondary">
            {count}
          </Typography>
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Search by tag" />}
      sx={{ mb: 3 }}
    />
  );
}
