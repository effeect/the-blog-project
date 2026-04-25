import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: "center",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Written by Oliver Dimes. Built with{" "}
        <MuiLink component={NextLink} href="https://nextjs.org" color="primary">
          Next.js
        </MuiLink>
        ,{" "}
        <MuiLink component={NextLink} href="https://mui.com" color="primary">
          Material UI
        </MuiLink>{" "}
        and{" "}
        <MuiLink
          component={NextLink}
          href="https://github.com/effeect/the-blog-project/tree/main"
          color="primary"
        >
          GitHub
        </MuiLink>
      </Typography>
    </Box>
  );
}
