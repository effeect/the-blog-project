import NextLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function PostControls({
  currentPost,
  currentIndex,
  nextPost,
  prevPost,
  ArrayLength,
}: {
  currentPost: string;
  currentIndex: string;
  nextPost: string;
  prevPost: string;
  ArrayLength: string;
}) {
  const isFirst = nextPost === currentPost;
  const isLast = prevPost === currentPost;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 4,
        flexWrap: "wrap",
      }}
    >
      <Button
        variant="outlined"
        component={isFirst ? "button" : NextLink}
        href={isFirst ? undefined : `/posts/${nextPost}`}
        disabled={isFirst}
      >
        Next Post
      </Button>

      <Typography variant="body2" color="text.secondary">
        Post {currentIndex} of {ArrayLength}
      </Typography>

      <Button
        variant="outlined"
        component={isLast ? "button" : NextLink}
        href={isLast ? undefined : `/posts/${prevPost}`}
        disabled={isLast}
      >
        Previous Post
      </Button>
    </Box>
  );
}
