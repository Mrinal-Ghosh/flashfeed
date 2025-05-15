import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen hover:cursor-pointer">
      <SignIn path="/login" routing="path" />
    </div>
  );
}
