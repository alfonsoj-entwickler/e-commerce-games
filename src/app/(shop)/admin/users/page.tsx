import { getPaginateUsers } from "@/actions";
import { Title } from "@/components";

import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function AdminUsers() {
  const { ok, users = [] } = await getPaginateUsers();

  if (!ok) {
    redirect("/auth/login");
  }
  console.log(users);
  return (
    <>
      <Title title="Admin Users" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
