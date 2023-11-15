"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { logout } from "@/appwrite/auth.actions.ts";
import { useRouter } from "next/navigation.js";
import { useAuth } from "@/context/AuthContext.tsx";
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoginTime, setIsLoginTime] = React.useState(false);
  const [path, setPath] = React.useState("/login");
  const [isAuthenticated, setIsAuthenticated] = React.useState(false || null);
  const router = useRouter();
  const checkLogin = async () => {
    try {
      const { isUserLoggedIn } = useAuth();
      setIsAuthenticated(isUserLoggedIn);
      if (!isUserLoggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkLogin();
    if (window.location.pathname === "/login") {
      setIsLoginTime(true);
      setPath("/signup");
    }
  }, []);
  const menuItems = [];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className=" p-5"
      shouldHideOnScroll
      position="static"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={<img src="/burger.svg" alt="toggle" />}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">MedInfoPlus</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>

        <NavbarItem isActive>
          <Link href="/home" aria-current="page">
            Articles
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/blog">
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem> */}
        {isAuthenticated ? (
          <NavbarItem>
            <Button
              onClick={() => logout()}
              as={Link}
              color="primary"
              href="/login"
              variant="flat"
            >
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href={path} variant="flat">
              {isLoginTime ? "Sigup" : "Login"}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
