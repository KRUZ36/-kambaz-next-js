import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link 
        href="/account/signin" 
        id="wd-account-signin-link"
        className="list-group-item active border-0"
      >
        Sign in
      </Link>
      <br />
      <Link 
        href="/account/signup" 
        id="wd-account-signup-link"
        className="list-group-item text-danger border-0"
      >
        Sign up
      </Link>
      <br />
      <Link 
        href="/account/profile" 
        id="wd-account-profile-link"
        className="list-group-item text-danger border-0"
      >
        Profile
      </Link>
      <br />
    </div>
  );
}