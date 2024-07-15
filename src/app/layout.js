import { Poppins } from "next/font/google";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import { lightTheme } from "../theme";

import { NavBar } from "./{components}/NavBar/NavBar";
import { AuthProvider } from "./{components}/AuthProvider";

import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Stock Tracker",
  description: "Stock Tracker",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={lightTheme}>
            <AuthProvider>
              <NavBar />
              <div className="flex-1 mt-[30px]">{children}</div>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
