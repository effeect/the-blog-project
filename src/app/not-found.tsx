import NextLink from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const metadata = {
  title: "oliverdimes.dev - Page Not Found",
};

export default function NotFound() {
  return (
    <Box component="section" sx={{ py: 6 }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sorry, the page or post you were looking for doesn&apos;t exist.
        </Typography>
        <Button variant="outlined" component={NextLink} href="/posts">
          Back to all posts
        </Button>
      </Container>
    </Box>
  );
}
