import NextLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function PageControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

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
        component={NextLink}
        href={`/posts?page=${currentPage - 1}`}
        aria-disabled={isFirst}
        sx={{
          pointerEvents: isFirst ? "none" : "auto",
          opacity: isFirst ? 0.38 : 1,
        }}
      >
        Previous
      </Button>

      <Typography variant="body2" color="text.secondary">
        {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="outlined"
        component={NextLink}
        href={`/posts?page=${currentPage + 1}`}
        aria-disabled={isLast}
        sx={{
          pointerEvents: isLast ? "none" : "auto",
          opacity: isLast ? 0.38 : 1,
        }}
      >
        Next page
      </Button>
    </Box>
  );
}
