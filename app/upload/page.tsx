import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UploadClient from "./UploadClient";

export default async function UploadPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <p className="text-gray-400">
        Please log in to view your analyzed documents.
      </p>
    );
  }

  return <UploadClient />;
}
