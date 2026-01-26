import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>

      <input
        className="wd-username"
        placeholder="username"
      /> 
      <br />

      <input
        className="wd-password"
        placeholder="password"
        type="password"
      /> 
      <br />

      {/* Sign in goes to the Dashboard page */}
      <Link id="wd-signin-btn" href="/dashboard">
        Sign in
      </Link>
      <br />

      {/* Sign up page link */}
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}
