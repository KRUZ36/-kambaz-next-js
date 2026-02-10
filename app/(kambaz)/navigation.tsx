"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { MdOutlineScience } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/account", icon: <FaRegCircleUser className="fs-1" />, label: "Account", id: "wd-account-link" },
    { href: "/dashboard", icon: <AiOutlineDashboard className="fs-1" />, label: "Dashboard", id: "wd-dashboard-link" },
    { href: "/courses", icon: <LiaBookSolid className="fs-1" />, label: "Courses", id: "wd-courses-link" },
    { href: "/calendar", icon: <IoCalendarOutline className="fs-1" />, label: "Calendar", id: "wd-calendar-link" },
    { href: "/inbox", icon: <FaInbox className="fs-1" />, label: "Inbox", id: "wd-inbox-link" },
    { href: "/settings", icon: <LiaCogSolid className="fs-1" />, label: "Settings", id: "wd-settings-link" },
    { href: "/labs", icon: <MdOutlineScience className="fs-1" />, label: "Labs", id: "wd-sLabs-link" },

  ];

  return (
    <ListGroup 
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" 
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem 
        className="bg-black border-0 text-center" 
        as="a"
        target="_blank" 
        href="https://www.northeastern.edu/" 
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <br />

      {links.map((link) => {
        const isActive = link.href === "/account" 
          ? pathname.includes("/account")
          : link.href === "/dashboard"
          ? pathname === "/dashboard"
          : pathname.includes(link.href) && link.href !== "/account";

        return (
          <ListGroupItem 
            key={link.href}
            className={`border-0 text-center ${isActive ? "bg-white" : "bg-black"}`}
          >
            <Link 
              href={link.href} 
              id={link.id} 
              className={`text-decoration-none ${isActive ? "text-danger" : "text-white"}`}
            >
              <div className={isActive ? "text-danger" : "text-white"}>
                {link.icon}
              </div>
              <br />
              {link.label}
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}