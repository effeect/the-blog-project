---
title: "Setting up a fun Ubuntu Autoinstall"
date: "2026-02-25"
tags: ["Software", "Ubuntu", "Setup"]
summary: "A quick introduction into the world of Ubuntu autoinstall stuff"
---

New week and a new thing I wanted to explore!

Specifically I wanted to explore the world of setting up Ubuntu Desktop and doing an automated setup of the operating system so it is ready to go.

The reason why I wanted to explore this is because I've been using Ubuntu Desktop on my main system recently and it's been fairly easy to use and more importantly stable. With that in mind, one of the benefits with Ubuntu is that you use the autoinstall functionality which can automate a lot of the boring setup stuff.

# Creating the autoinstall.yml

First of all, we needed to create a simple autoinstall script for the Ubuntu wizard to read and process. The most essential thing for this autoinstall script is to get Docker up and running and I believe I have achieved it.

```yml
#cloud-config
# Note the following about this script :
# - Designed to be used with Ubuntu Desktop for personal use
# - Mixture of dev tools and some entertainment stuff like Steam/VLC
autoinstall:
  version: 1
  locale: en_US.UTF-8
  keyboard:
    layout: us
  identity:
    hostname: odimes-desktop
    realname: Oliver Dimes
    username: odimes
  # Doing a standard storage setup for Ubuntu Desktop
  storage:
    layout:
      name: direct
  # Below are the packages to install
  packages:
    - curl
    - git
    - vlc
    - build-essential
    - python3-pip
    - docker.io
  #  - steam-installer
  # Not much snap packages needed
  snaps:
    - name: bruno
    - name: code
      classic: true
  user-data:
    package_upgrade: true
    timezone: UTC
    # Docker configuration at the bottom
    runcmd:
      - usermod -aG docker odimes
  late-commands:
    # Install/setup Node.js, using Nodesource instead of the ones in Ubuntu repos
    - curtin in-target -- bash -c "curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -"
    - curtin in-target -- apt install -y nodejs
    # Install Google Chrome, Firefox is already preinstalled
    # Doesn't work on Ubuntu ARM
    # - curtin in-target -- bash -c "wget -qO - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-linux.gpg"
    # - curtin in-target -- bash -c "echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/google-linux.gpg] http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/google-chrome.list"
    # - curtin in-target -- apt update
    # - curtin in-target -- apt install -y google-chrome-stable
    # Enable the docker service at the very end
    - curtin in-target -- systemctl enable docker
```

Note that this should work on both ARM-based Ubuntu Desktop and x86-based Ubuntu Desktop which is good to note. I've commented out Steam as there is no native ARM version for Steam on Ubuntu.

# Serving it locally

One of the interesting challenges of making this was hosting the file statically and giving it to the user. Whilst I could put the file on the internet and grab it from there, I would rather have the file hosted locally, especially if we start involving password configuration and network configuration.

```js
const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
const yaml = require("js-yaml");
const { spawnSync } = require("child_process");
const PORT = 3000;

dotenv.config();

// Check if the password variable has been set
if (!process.env.PASSWORD) {
  console.error("No Password detected, check your environment file. Exiting");
  process.exit(1);
}

app.get("/desktop-config", (req, res) => {
  // Need to do some trickery and add the password from the .env
  const filePath = path.join(__dirname, "public", "desktop-config");
  const fileContents = fs.readFileSync(filePath, "utf8");
  let doc = yaml.load(fileContents, "utf8");
  // Doing password hashing with openssl
  const result = spawnSync("openssl", ["passwd", "-6", process.env.PASSWORD]);
  const hashedPassword = result.stdout.toString().trim();

  doc.autoinstall = doc.autoinstall || {};
  doc.autoinstall.identity = doc.autoinstall.identity || {};
  doc.autoinstall.identity.password = hashedPassword;

  const updated = yaml.dump(doc, {
    lineWidth: -1,
    quotingType: '"',
    noCompatMode: true,
  });
  res.type("text/yaml");
  res.send(updated);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Check the desktop-config: http://localhost:${PORT}/desktop-config`,
  );
});
```

The way to do this is to spin up a basic Express server that has an endpoint that returns the autoinstall.yml, so in the Ubuntu desktop wizard, you just point to the system running the Express server. I've also done some basic password handling so the password gets hashed and is injected into the .yaml file. For local use, I think this is a good solution.

# What to do next

I want to do some more network config changes however I don't have a super permanent network setup at my house at the moment so it's a little tricky to get it working. Anyways, I'm quite happy with how quick it was to get up and running. Going to get back to it.
