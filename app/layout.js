import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Pilkyu Han's Portfolio",
  description: "Portfolio Website Using Notion API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-primary antialiased">
        <ThemeProvider attribute="class">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
