import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </Suspense>
  );
}
