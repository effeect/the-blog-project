import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import BlueskyIcon from "../icons/BlueskyIcon";

const contacts = [
  {
    label: "GitHub",
    href: "https://github.com/effeect",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/oliver-dimes-793b31194/",
    icon: <LinkedInIcon />,
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/effeect.bsky.social",
    icon: <BlueskyIcon />,
  },
  {
    label: "Mail Me!",
    href: "mailto:effeect-contact@pm.me",
    icon: <EmailIcon />,
  },
];

const ContactButtons = () => {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
      {contacts.map(({ label, href, icon }) => (
        <Button
          key={label}
          variant="outlined"
          startIcon={icon}
          component="a"
          href={href}
          color="inherit"
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};

export default ContactButtons;
