// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

// import { Manrope } from 'next/font/google'
import { Work_Sans } from "next/font/google"
import { cn } from '@/lib/utils'
import './globals.css'

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ['400', '600', '700'],
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased font-sans',
          workSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}