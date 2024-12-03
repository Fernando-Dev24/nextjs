import { Metadata } from "next";
import { SimpleWidget } from "../../../components/SimpleWidget";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, cumque!",
};

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl">Informacion General</span>

      <div className="flex flex-wrap p-2 justify-center">
        <SimpleWidget />
      </div>
    </div>
  );
}
