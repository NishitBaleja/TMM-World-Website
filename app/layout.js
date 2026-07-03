import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import CustomCursor from "@/components/global/CustomCursor";

export const metadata = {
  title: "Izanami | Sharing the Japanese Spirit of Harmony",
  description: "Harmony is not something to be created — it is something to be remembered. Guided by the spirit of Wa, Izanami designs harmony across life through School, Craft, and Retreat.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#080808] text-[#e6e4e2] selection:bg-[#d4c3b3] selection:text-black"
        suppressHydrationWarning
      >
        <CustomCursor />
        <div className="grain-overlay" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
