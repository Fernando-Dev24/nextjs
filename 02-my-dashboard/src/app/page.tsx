import { redirect } from "next/navigation";

export default function HomePage() {

  redirect('/dashboard/counter'); // <- esto retorna never
}