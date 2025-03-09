import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center gap-2">
      <button onClick={() => router.back()} className="btn btn-ghost btn-sm flex items-center">
        <ArrowLeft className="mr-2 size-5" />
        <p className="text-lg"> Volver </p>
      </button>
    </div>
  )
}