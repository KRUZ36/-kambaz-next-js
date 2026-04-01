"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    } catch (e: any) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input className="wd-username form-control mb-2" placeholder="username"
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      <input className="wd-password form-control mb-2" placeholder="password"
        type="password"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <button onClick={signin} className="btn btn-primary w-100 mb-2"
        id="wd-signin-btn">
        Sign in
      </button>
      <Link id="wd-signup-link" href="/account/signup">Sign up</Link>
    </div>
  );
}