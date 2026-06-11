import BookSlider from "@/Components/BookSlider";
import Featuring from "@/Components/Featuring";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Review from "@/Components/Review";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <BookSlider></BookSlider>
      <Featuring></Featuring>
      <Review></Review>
    </div>
  );
}
