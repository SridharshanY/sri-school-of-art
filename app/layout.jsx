import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  title: {
    default: "Sri School of Art | Drawing, Painting & Craft Classes",
    template: "%s | Sri School of Art"
  },
  description:
    "Friendly art and craft classes for children, teens and adults. Explore drawing, painting, creative workshops and beginner-friendly trial classes.",
  keywords: [
    "art classes",
    "drawing classes",
    "painting classes",
    "craft classes",
    "kids art classes",
    "adult hobby classes"
  ],
  openGraph: {
    title: "Sri School of Art",
    description:
      "A welcoming place to draw, paint, make and grow — for every age and stage.",
    type: "website"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff9f0"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
