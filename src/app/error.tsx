"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box component="section" sx={{ py: 6 }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          An unexpected error occurred while loading this page.
        </Typography>
        <Button variant="outlined" onClick={() => reset()}>
          Try again
        </Button>
      </Container>
    </Box>
  );
}
