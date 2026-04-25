"use client";

import { useState } from "react";
import NextLink from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import BlueskyIcon from "../icons/BlueskyIcon";
import styles from "./navbar.module.css";

const navLinks = [
  { label: "Posts", href: "/posts" },
  { label: "About Me", href: "/about" },
];

const iconLinks = [
  {
    label: "GitHub",
    href: "https://github.com/effeect",
    icon: <GitHubIcon />,
    className: styles.itemHover_white,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/oliver-dimes-793b31194/",
    icon: <LinkedInIcon />,
    className: styles.itemHover_linkedin,
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/effeect.bsky.social",
    icon: <BlueskyIcon />,
    className: styles.itemHover,
  },
  {
    label: "Email",
    href: "mailto:effeect-contact@pm.me",
    icon: <EmailIcon />,
    className: styles.itemHover_white,
  },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky" aria-label="main navigation">
        <Toolbar>
          {/* Logo */}
          <Typography
            component={NextLink}
            href="/"
            variant="h6"
            className={styles.logoText}
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            oliverdimes.dev
          </Typography>

          {/* Desktop nav links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navLinks.map(({ label, href }) => (
              <Button
                key={label}
                component={NextLink}
                href={href}
                color="inherit"
                className={styles.itemHover}
              >
                {label}
              </Button>
            ))}
            {iconLinks.map(({ label, href, icon, className }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                aria-label={label}
                color="inherit"
                className={className}
              >
                {icon}
              </IconButton>
            ))}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="end"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 220 }} role="presentation">
          <List>
            {navLinks.map(({ label, href }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  component={NextLink}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {iconLinks.map(({ label, href, icon }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  component="a"
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                >
                  <Box sx={{ mr: 1.5, display: "flex" }}>{icon}</Box>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
