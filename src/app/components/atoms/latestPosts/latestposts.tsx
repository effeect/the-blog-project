import { getSortedPosts } from "@/app/lib/posts";
import NextLink from "next/link";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Date from "@/app/lib/date";
import styles from "./latestPosts.module.css";

type PostData = {
  id: string;
  date: string;
  title: string;
};

export default function LatestPostList() {
  const allPostsData = getSortedPosts() as PostData[];
  const displayedPosts = allPostsData.slice(0, 5);

  return (
    <Container maxWidth="md" sx={{ px: 2, py: 2 }}>
      <Paper
        data-testid="latest-posts"
        elevation={1}
        className={styles.boxBlur}
        sx={{ p: 3 }}
      >
        <Typography variant="h5" gutterBottom>
          Latest Posts
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <MuiLink component={NextLink} href="/posts" color="primary">
            View All
          </MuiLink>
        </Typography>

        <List disablePadding>
          {displayedPosts.map(({ id, date, title }) => (
            <ListItem key={id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NextLink}
                href={`/posts/${id}`}
                className={styles.itemHover}
                sx={{ borderRadius: 1 }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">{title}</Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      Posted on <Date dateString={date} />
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
