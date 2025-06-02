import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StreamLine - Simplify Your Workflow",
  description: "Boost productivity, reduce overhead, and focus on what matters most with our all-in-one platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ThemeProvider>
  )
}
