import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Pilkyu Han's Portfolio",
  description: "Portfolio Website Using Notion API",
  icons: {
		icon: "/diagram-06_24511.ico",
		shortcut: "/home.png",
		apple: "/home.png",
	},
  
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
