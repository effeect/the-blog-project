---
title: "How to make a Node.js Docker Container quickly"
date: "2026-01-29"
tags: ["Node", "Docker"]
summary: "A quick and easy way to create a node docker container, good for small npm based projects."
---

Yesterday, I was working on something that is quite common for a lot of developers and that is putting your programme/project into a container.

I don't want to turn this post into a ramble about whether a container is right for your environment, but the key point is that I often find myself needing to get a Node-based project, whether it’s an Express server or a React project wrapped in a container with Docker, and I would always be looking up how to do this rather basic thing I need to do. This post is for myself, to be honest.

# The Solution

There are two parts to this solution.

Let's start off with the Dockerfile; it's basic but should be quite compatible for most projects. This Dockerfile needs to be placed in the same directory where your package.json lives (likely the root folder):

```Dockerfile
FROM node:alpine

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
# This can be changed, was set as this for an express-api project I was doing yesterday
EXPOSE 8080

# Below can be changed, but would recommend using the scripts defined in package.json
CMD ["npm", "start"]
```

Whilst you could do a `docker run` on that, I often find myself using `docker compose`, and the best way to do it is to have a docker compose file above the folder with the following values :

```yaml
services:
  example:
    build: ./your-folder-here
    ports:
      - "8080:8080"
    environment:
      - API_KEY=${API_KEY}
      - PORT=${PORT}
```

Then, just run `docker compose up`, and it should build very quickly. Please note the following with the solution:

- Using Node alpine is fine for this but in a prod environment or anything critical, should be version fixed to stop issues
- You can do a volume bind in docker compose and if you swap the npm commands a bit, you can have a portable dev environment (so when you make changes in the hypervisor, those changes can be replicated in the docker containers)

Thanks for reading.
