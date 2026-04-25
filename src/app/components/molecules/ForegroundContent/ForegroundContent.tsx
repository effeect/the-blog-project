import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LatestPostList from "../../atoms/latestPosts";
import ProfilePic from "../../atoms/ProfilePic/ProfilePic";

const ForegroundContent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 8,
        px: 2,
        textAlign: "center",
      }}
    >
      <ProfilePic />

      <Typography variant="h3" sx={{ mb: 1 }}>
        oliverdimes.dev
      </Typography>
      <Container maxWidth="md">
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Posts and projects about my development and more!
        </Typography>
      </Container>

      <LatestPostList />
    </Box>
  );
};

export default ForegroundContent;
