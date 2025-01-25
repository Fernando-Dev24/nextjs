import { Title } from "@/components";
import { AddressForm } from "./ui/address-form";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export default async function NamePage() {
  const session = await auth();
  const countries = await getCountries();

  if (!session) {
    return (
      <h3 className="text-5xl">
        ERROR 500 - NO HAY UNA SESION DE USUARIO ACTIVA
      </h3>
    );
  }

  const storedAddress = (await getUserAddress(session.user.id)) ?? undefined;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subTitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoredAddress={storedAddress} />
      </div>
    </div>
  );
}
