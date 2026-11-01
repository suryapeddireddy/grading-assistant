import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </Suspense>
  );
}
