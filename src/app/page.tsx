import UserPage from "@/app/_components/userPage";
import { checkRole } from '@/utils/roles';
import { Protect } from '@clerk/nextjs';
import AdminPage from "@/app/_components/adminPage";

export default function Page() {

  return (
    <main className="px-5 lg:px-10 xl:px-15 py-5">
      <Protect 
        condition={has => checkRole("admin")}
        fallback={<UserPage/>}
      >
        <AdminPage/>
      </Protect>
    </main>
  );
}
