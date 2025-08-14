import BusinessForm from "@/components/common/BusinessForm";
import { auth } from "@clerk/nextjs/server";

const CreateBusiness = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  console.log(userId);

  return (
    <>
      <section className=" py-5 md:py-2">
        <h3 className="wrapper h3-bold font-bold text-3xl text-blue-600 text-center sm:text-left">
          Create your business
        </h3>
      </section>

      <div className="wrapper ">
        <BusinessForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateBusiness;
