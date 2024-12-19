import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const id = (await params).id;

  if (id === "kids") {
    return notFound(); // return never;
  }

  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}
