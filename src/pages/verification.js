import dynamic from "next/dynamic";

const Verification = dynamic(
   () => import("@/components/verification"),
   { ssr: false }
);

export default function VerificationPage() {
   return (
      <>
         <Verification />
      </>
   );
}