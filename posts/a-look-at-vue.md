---
title: "A look at vue for my future endeavours"
date: "2025-11-06"
tags: ["JavaScript", "Vue", "Dev"]
summary: "Decided to do some basic introduction stuff into Vue and some general looks at things I would like to do in Next (or not)"
previewImage: "/assets/centos-world-of-pain/preview-docker.jpeg"
---

It's been a week or so since my last post and I've been doing some development on my Python stuff however I really wanted to focus my attention on JavaScript.

# Feeling Lost with my learning

For the last few weeks I've been on and off learning and sprucing up my programming skills whilst I'm on my working holiday visa in Japan and one of the things I wanted to give a crack at was using more frameworks as most of my time at Uni was on a JS framework called P5.js which wasn't particularly real world use case in the world of the modern web.

I did spend some time doing some small react stuff in the past but I've never really had the opportunity to do something from scratch so I used my lack of knowledge as an opportunity to investigate into some more JS frameworks. And I started with Next.js with Tailwind.css

# There are some neat benefits (at first)

One of the things I really have loved about Next.js is the fact that the underlying core of it is **React** which I know sounds odd at first but because of this, a lot of the issues you might run into is easily searchable. And if you have an idea of how you would like to do something, it's likely someone has already done it in React which is super neat.

It's actually a similar reason to why I tend to stick with Ubuntu distros as all of the potenial issues/questions I may have will have likely been answered which is a pretty vaulable thing. Especially if the documentation is not up to standard.

And I've built quite a few things with it so far, including this blog, a secret santa list maker and a video frame extractor thing as well which I'm pretty happy with for a few first time projects. You can check them out here

- [The Blog](https://oliverdimes.dev/)
- [Secret Santa](https://secret-santa-maker-next.vercel.app/)
- [Frame Extractor](https://frame-extracter-site.vercel.app/)

And especially with the power of tailwind, it is super quick to develop and prototype certain ideas out which is great.

# However, not is all great

One of the main problems I've had with next.js is that I think as a framework, it is incredibly large to throw around and to be honest, do I need an entire framework like Next to power a secret santa list maker? No, you wouldn't even need React to do something like this.

And this is where my thinking started to go as I'm unsure myself what Next.js would be good for in my personal projects. I'm currently using it to power my frontend on LANMAN however that can be easily changed/swapped out as the code is relatively basic at the moment.

Tailwind whilst great has kind of left me feeling a bit dumbfounded at times, not because its a bad product but the design of tailwind.css itself. I've had an incredibly difficult time trying to get image captions working on this blog and the solution I'm going to have to do is so complicated and I wish tailwind.css was better equipped for handling such small edits.

# Wanted to go exploring, so checked out Vue!

After my frustrations, I wanted to take a break and look at something else and that's when I decided to take a brief look at vue and from my impressions. I'm actually quite liking it, I'm working through a book at the moment and I don't think I'm as up to speed with it as Next.js but I am quite looking forward to dig my teeth more into it over the weekend hopefully.

My main thing that I'm happy about is how the component files are dead simple, just three tags that you need to worry about which are :

```vue
<template></template>
<script setup></script>
<style></style>
```

Whilst this seems like a little thing at first, it kind of forces you to write components in a much more readable way, especially as any styling or scripting stuff can be out of the way and not in the `<template>` itself which is a nice thing.

There is also the lifecycle allows us to call certain commands during the rendering, mounting and creation of the component which is really nice.

The only complication I have found with vue.js so far is that there are two options of API at the moment, I'm trying to stick to the newer composition API. I've actually built a quick thing in Vue.js trying to replicate a small snippet of my [blog](https://github.com/effeect/vue-js-components).

It's not super complete and its more of a proof of concept but I'm really liking how Vue works and I might delve a bit deeper into it. I'm also using Bulma to do the CSS stuff and I do prefer it to Tailwind but I'm not too far into Bulma to see any issues with it yet.

Also one highlight I wanted to point out is the excellent blog post here about how to go about Atomic Design which I found to be a [Good Read](https://blog.kamathrohan.com/atomic-design-methodology-for-building-design-systems-f912cf714f53)

# One lesson for me to take away

I think one of the biggest stories I can take away from this escapade is that I think I need to spend more time planning on the projects that I want to do as I think that I'm going into somewhere, hacking something up which works great at first but whenever I try to extend it or make a signficant change, it breaks and I have to spend so much more time fixing it.

I'm going to study and take a look at vue more and maybe me studying a different JS framework will give me some insight and best practises for handling other JS frameworks such as Next.js and more.

When I do come back to Next. I think I might make an effort to get rid of Tailwind and switch over to Bulma as I do like some of the styling much more and hopefully I don't expercience some of the image captioning issues I was experiencing, although I need to spend some more time with Bulma before making the Jump.

Many Thanks,
Oliver Dimes
