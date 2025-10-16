---
title: "Using Docker to get CentOS Offline Downloads"
date: "2023-09-25"
tags: ["CentOS", "Docker", "Scripts"]
summary: "An article about the issues of grabbing offline dependencies and the ugly solution for it"
previewImage: "/assets/centos-world-of-pain/preview-docker.jpeg"
---

# Note:

This article has been taken from my old blog and reposted here. Hence the gap of time between my posts. Can be found here : [Github](https://github.com/effeect/effeect.github.io/blob/master/_posts/2023-04-23-CentOS-World.md)

# CentOS

This is a situation that might be a minority but it's something that I have had to deal with when I'm hosting my own virtual machines with CentOS.

# The Situation

I want an offline download of some of my favourite programs and tools, and what I found is unlike Windows which is mostly prepackaged so most of the time you can grab the install binaries and it "should" work.

CentOS in general is quite fiddly especially when it comes to programs with lots of install dependencies and depending on the environemnt you are working on, you have no idea how vanialla or even what stuff is installed.

And to makes matters worst, downloading deps on a machine that already has the deps may bring out some odd results when you try and bring those files over to another VM.

# The Solution

What I found is that funnily enough, using Docker and yumdownloader in combination allowed me to grab all the deps retaviely quickly without having to resort to creating a new VM entirely. And I've created a neat script to do this. Whilst this is mostly designed for CentOS7 use, it could be adapted to other Linux Operating Systems. But for most other systems, I would recommend setting it up manually like below.

The first step is to simply get a docker container running, I'm naming the container as "temp_container" to make life a little easier :

    docker run --rm --name temp_container vm_name_here tail -f /dev/null

Inside the Docker Container I run these commands :

    mkdir /tmp/install-deps
    cd /tmp/install-deps

    yum install yum-plugin-downloadonly yum-utils zip -y
    yum install --downloadonly --downloaddir=/tmp/install-deps your-repo-here
    zip install-deps *

Once the zip file is created I can grab the files from the docker container with this command :

    docker cp temp_container:/tmp/install-deps/install-deps.zip install-deps.zip

Repo for an automated script is here : [Github Repo](https://github.com/effeect/grab-all-dependencies-yum)
