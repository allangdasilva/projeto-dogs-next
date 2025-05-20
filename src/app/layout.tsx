import type { Metadata } from "next";
import "./globals.css";
import { type_display } from "@/functions/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserContextProvider } from "@/context/user-context";
import getUsuario from "@/actions/get-usuario";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getUsuario();
  return (
    <html lang="pt-br">
      <body className={type_display.variable}>
        <UserContextProvider user={data}>
          <div className="App">
            <Header />
            <main className="AppMain">{children}</main>
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
