"use client";

export default function AuthLayout({ children }) {
  return (
    <div className="flex justify-center items-center h-full">
      <form className="w-[500px] flex flex-col items-stretch gap-8">
        {children}
      </form>
    </div>
  );
}
