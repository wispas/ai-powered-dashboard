import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import DeletePropertyButton from "@/components/properties/DeletePropertyButton";



export default async function PropertiesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const properties = await prisma.property.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">My Properties</h2>

        <Link
          href="/properties/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray-500">No properties added yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <Th>Name</Th>
                <Th>City</Th>
                <Th>Risk</Th>
                <Th>Value</Th>
                <Th>Actions</Th>
              </tr>
            </thead>

            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <Td>{p.name}</Td>
                  <Td>{p.city}</Td>
                  <Td>{p.riskScore}</Td>
                  <Td>₹{p.value.toLocaleString()}</Td>
                  <Td>
                        <div className="flex gap-3">
                        <Link href={`/properties/${p.id}/edit`} className="text-blue-600">
                            Edit
                        </Link>


                            <DeletePropertyButton id={p.id} />
                        </div>
                    </Td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-sm text-gray-800">
      {children}
    </td>
  );
}


