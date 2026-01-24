import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function EditPropertyPage(
  props: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  // ✅ unwrap async params
  const { id } = await props.params;
  const propertyId = Number(id);

  if (isNaN(propertyId)) {
    redirect("/properties");
  }

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property || property.userId !== session.user.id) {
    redirect("/properties");
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Property</h2>

      <form
        action={`/api/properties/${property.id}`}
        method="POST"
        className="space-y-4"
      >
        <input
          name="name"
          defaultValue={property.name}
          className="border p-2 w-full"
        />

        <input
          name="riskScore"
          type="number"
          step="0.01"
          defaultValue={property.riskScore}
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
