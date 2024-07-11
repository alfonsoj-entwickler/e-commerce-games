import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function Category({ params }: Props) {
  const { id } = params;
  if (id === "nintendo") {
    notFound();
  }
  return (
    <div>
      <h1>category {id}</h1>
    </div>
  );
}
