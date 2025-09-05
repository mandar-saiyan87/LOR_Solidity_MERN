import "./globals.css";
import { Web3Provider } from "./Web3Provider";


export const metadata = {
  title: "LOR System",
  description: "Request Letter of Recommendationand Get it approved",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
