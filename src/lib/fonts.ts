import { Fira_Sans, Marck_Script, Hind_Siliguri } from "next/font/google";

export const fontFira = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fira",
  display: "swap",
});

export const fontMarck = Marck_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marck",
  display: "swap",
});

export const fontHind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-hind",
  display: "swap",
});
