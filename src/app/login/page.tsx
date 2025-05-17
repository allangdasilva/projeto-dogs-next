import FormLogin from "@/components/login/FormLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Dogs",
  description: "Logue na sua conta no site Dogs.",
};

export default async function LoginPage() {
  return (
    <>
      <div className="animeLeft">
        <h1 className="title">Login</h1>
        <FormLogin />
      </div>
    </>
  );
}
