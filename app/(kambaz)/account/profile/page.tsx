"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, router]);

  const updateProfile = async () => {
    try {
      const updated = await client.updateUser(profile);
      dispatch(setCurrentUser(updated));
    } catch (e: any) {
      setError("Update failed.");
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  if (!currentUser) return null;

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input className="form-control mb-2" placeholder="username"
        value={profile.username || ""}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
      <input className="form-control mb-2" placeholder="password" type="password"
        value={profile.password || ""}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
      <input className="form-control mb-2" placeholder="First Name" id="wd-firstname"
        value={profile.firstName || ""}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
      <input className="form-control mb-2" placeholder="Last Name" id="wd-lastname"
        value={profile.lastName || ""}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
      <input className="form-control mb-2" type="date" id="wd-dob"
        value={profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : ""}        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
      <input className="form-control mb-2" placeholder="email" type="email" id="wd-email"
        value={profile.email || ""}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
      <select className="form-control mb-2" id="wd-role"
        value={profile.role || "USER"}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
        Update
      </button>
      <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
        Sign out
      </button>
    </div>
  );
}