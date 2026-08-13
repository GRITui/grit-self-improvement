import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/auth/stack";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FollowThru",
  description: "An AI accountability copilot for coaches.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {/* StackProvider makes the Neon Auth (Stack Auth) client available
            to useStackApp()/useUser() in client components (login/signup
            forms, the Google button); StackTheme is only load-bearing for
            the handler route's built-in pages (OAuth callback, etc.) --
            this app's own UI doesn't use Stack's prebuilt components. */}
        <StackProvider app={stackServerApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
