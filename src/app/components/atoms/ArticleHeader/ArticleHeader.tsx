import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Date from "../../atoms/date/date";
import { PostData } from "@/app/types/PostData.type";

const ArticleHeader = ({ postData }: { postData: PostData }) => {
  return (
    <Box component="header" sx={{ mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        {postData.title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1.5 }}>
        {postData.summary ?? "No Summary Available, sorry!"}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          Posted on{" "}
          <strong>
            <Date dateString={postData.date} />
          </strong>
        </Typography>
      </Box>

      {postData.tags?.length && (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
          {postData.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" color="primary" />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ArticleHeader;
