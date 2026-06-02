"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
    } else {
      router.push("/account/profile");
    }
  }, []);

  return null;
}