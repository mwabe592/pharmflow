import AdminDashboard from "@/components/dashboard/AdminDashboard";
import IndividualDashboard from "@/components/dashboard/IndividualDashboard";
import getUser from "../utils/helpers/getUser";
// import { MobileNav } from "@/components/dashboard/mobile-nav";

export default async function DashboardPage() {
  const { userData } = await getUser();

  const isAdmin = userData?.user_type === "admin";

  // console.log(userData);

  return (
    <>
      {isAdmin ? (
        <>
          <AdminDashboard user={userData} />
          {/* <MobileNav user={userData} /> */}
        </>
      ) : (
        <>
          <IndividualDashboard user={userData} />
          {/* <MobileNav user={userData} /> */}
        </>
      )}
    </>
  );
}
