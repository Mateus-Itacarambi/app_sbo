"use client";

import { Suspense } from "react";
import RedefinirSenhaForm from "@/components/RedefinirSenhaForm";
import Loading from "@/components/Loading";

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RedefinirSenhaForm />
    </Suspense>
  );
}
