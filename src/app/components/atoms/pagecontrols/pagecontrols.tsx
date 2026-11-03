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

  // At either end the control is a disabled button rather than a link, so
  // keyboards and crawlers can't follow it to a page that doesn't exist.
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
        href={isFirst ? undefined : `/posts?page=${currentPage - 1}`}
        disabled={isFirst}
      >
        Previous
      </Button>

      <Typography variant="body2" color="text.secondary">
        {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="outlined"
        component={isLast ? "button" : NextLink}
        href={isLast ? undefined : `/posts?page=${currentPage + 1}`}
        disabled={isLast}
      >
        Next page
      </Button>
    </Box>
  );
}
