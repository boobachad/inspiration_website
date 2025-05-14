import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "@/styles/globals.css";
import NavLinks from "@/components/nav-links";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` max-w-2xl mx-auto px-6 py-8 flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <Image
                src="/placeholder.jpg"
                alt="Boobachad"
                width={64}
                height={64}
                className="grayscale rounded-full hover:shadow-md transition-shadow duration-200"
                priority={false}
              />
              <div>
                <h1 className="font-medium text-lg text-gray-900 dark:text-gray-100">Boobachad</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">booda & brada</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <Link
                href="https://twitter.com/boobachad"
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-block transform hover:scale-110 transition-transform duration-200">
                  <FontAwesomeIcon icon={faXTwitter} size="lg" />
                </span>
              </Link>
              <Link
                href="https://github.com/boobachad"
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-block transform hover:scale-110 transition-transform duration-200">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </span>
              </Link>
              <Link
                href="https://linkedin.com/in/username"
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-block transform hover:scale-110 transition-transform duration-200">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </span>
              </Link>
            </div>
          </header>

          <NavLinks />

          <main className="flex-1">{children}</main>

          <footer className="py-8 flex flex-col items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Link
                href="https://twitter.com/boobachad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                Boobachad
              </Link>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
