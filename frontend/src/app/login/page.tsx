import { redirect } from "next/navigation";

export default function LoginPage() {
  // We use the root page (`/`) as our unified login portal now.
  redirect("/");
}
