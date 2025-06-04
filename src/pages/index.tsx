import Image from "next/image";
import { Barlow_Semi_Condensed } from "next/font/google";

//components
import { Game } from "@/components/Game";

//fonts
const barlowSemiCondensed = Barlow_Semi_Condensed({
  variable: "--font-barlow-semi-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});


export default function Home() {
  return (
    <div
      className={`${barlowSemiCondensed.className} min--h-screen`}
    >
           <Game />

    </div>
  );
}
