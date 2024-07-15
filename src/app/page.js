import { redirect } from "next/navigation";

import { PATHS } from "@/constants";

export default function Home() {
  redirect(PATHS.stock);
}
