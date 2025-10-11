// Custom Imports
import HeroHeader from "./components/heroHeader";
import Head from "next/head";

export default function Home() {
  console.log("Home Page Loaded");
  return (
    <>
      <title>Oliver J Dimes - Home </title>
      <HeroHeader></HeroHeader>
    </>
  );
}
