import "./globals.css";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./components/LanguageProvider"


export const metadata = {
  title: "Pilkyu Han's Portfolio",
  description: "Portfolio Website Using Notion API",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/home.png",
    apple: "/home.png",
  },
  verification: {
    google: 'DgBB-GYrEgXCd7mMHmUfwRETfed6yooaCUCE806G7gU',
    
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
      <LanguageProvider>
        <ThemeProvider attribute="class">
          {children}
          <Footer />
        </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
