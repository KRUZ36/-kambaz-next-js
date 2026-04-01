"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/account/profile");
    } catch (e: any) {
      setError(e.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input className="wd-username form-control mb-2" placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <input className="wd-password form-control mb-2" placeholder="password"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <button onClick={signup} className="wd-signup-btn btn btn-primary w-100 mb-2">
        Sign up
      </button>
      <Link href="/account/signin" className="wd-signin-link">Sign in</Link>
    </div>
  );
}