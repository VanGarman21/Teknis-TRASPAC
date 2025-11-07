import { redirect } from "next/navigation";

// Server-side redirect: send root (/) straight to /login
export default function Home() {
  redirect("/login");
}
