import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <UserButton
        userProfileMode="navigation"
        userProfileUrl="/"
      />
    </div>
  );
}
