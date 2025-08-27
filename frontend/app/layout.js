import "./globals.css";



export const metadata = {
  title: "LOR System",
  description: "Request Letter of Recommendationand Get it approved",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
