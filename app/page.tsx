"use client"
import { useEffect, useRef } from "react";

const YouTubeBackground = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the YouTube IFrame Player API code asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          mute: 1,
          loop: 1,
          playlist: videoId
        },
        events: {
          onReady: (event) => event.target.playVideo()
        }
      });
    };

    return () => {
      // Clean up
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div id="youtube-player" className="w-full h-full" />
    </div>
  );
};

export default function Home() {
  return (
    <>
      <YouTubeBackground videoId="t3xAgfidbzg" />

      <div className="relative w-full h-screen flex items-center justify-center">
          <div className="flex flex-col gap-5">
              <h1 className="text-6xl font-black text-white">Commodity Trade Data</h1>
            <div className="bg-slate-100 shadow-md grid grid-cols-4 rounded-md justify-items-center p-6 gap-10">
                <h1 className=" text-3xl font-bold">Commodity</h1>
                <h1 className=" text-3xl font-bold">High Price</h1>
                <h1 className=" text-3xl font-bold">Low Price</h1>
                <h1 className=" text-3xl font-bold">Price Change</h1>
            </div>
            {CommodityData.map((item, index) => (
              <div key={index} className="bg-slate-50 grid grid-cols-4 p-6 rounded-md justify-items-center text-3xl font-bold" >
                <h1>{item.commodity}</h1>
                <h1>{item.highPrice.toLocaleString()}</h1>
                <h1>{item.lowPrice.toLocaleString()}</h1>
                <h1>{item.priceChange}</h1>
              </div>
            ))}
          </div>
      </div>
    </>
  );
}

const CommodityData = [
  { commodity: "Coffee", highPrice: 4800, lowPrice: 5098, priceChange: 100 },
  { commodity: "Sesame", highPrice: 4230, lowPrice: 5013, priceChange: 990 },
  { commodity: "Cocoa", highPrice: 10230, lowPrice: 11013, priceChange: 80 },
]

