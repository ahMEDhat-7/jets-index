import { redirect } from "next/navigation";

export default function BlogRedirect(): never {
  redirect("/en/blog");
}
