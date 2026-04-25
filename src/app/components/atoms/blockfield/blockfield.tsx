import React from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Date from "@/app/lib/date";
import styles from "./blockfield.module.css";

type PostData = {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  summary?: string;
};

export default function BlockField({
  currentPosts,
}: {
  currentPosts: PostData[];
}) {
  return (
    <Box
      data-testid="post-list"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {currentPosts.map(({ id, date, title, tags, summary }) => (
        <Paper
          key={id}
          data-testid="post-card"
          elevation={2}
          className={styles.postBox}
          sx={{ p: 2.5 }}
        >
          <NextLink href={`/posts/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h5"
              className={styles.hoverUnderline}
              gutterBottom
            >
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {summary}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Posted on <Date dateString={date} />
            </Typography>

            {tags && tags.length > 0 && (
              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5, mt: 1.5 }}>
                {tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" color="primary" />
                ))}
              </Stack>
            )}
          </NextLink>
        </Paper>
      ))}
    </Box>
  );
}
