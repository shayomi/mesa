import BusinessForm from "@/components/common/BusinessForm";
import { auth } from "@clerk/nextjs/server";

const UpdateBusiness = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className=" py-5 md:py-10">
        <h3 className="wrapper h3-bold font-bold text-3xl text-blue-600 text-center sm:text-left">
          Update your business
        </h3>
      </section>

      <div className="wrapper my-8">
        <BusinessForm userId={userId} type="Update" />
      </div>
    </>
  );
};

export default UpdateBusiness;
