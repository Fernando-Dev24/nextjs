import { RegisterForm } from "./ui/register-form";
import { titleFont } from "@/config/fonts";

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>
        Crea una nueva cuenta
      </h1>

      <RegisterForm />
    </div>
  );
}
