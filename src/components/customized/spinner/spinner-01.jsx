import { LoaderIcon } from "lucide-react";

export default function SpinnerDemo() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <LoaderIcon className="animate-spin size-20 text-astro-green" />
      </div>
    </>
  )
}
