"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import NavIcon from "./NavIcon";
import { AccountDropDown, CategoryDrop } from "./Menu";

export default function Nav({ children }: { children: ReactNode }) {
  return (
    <nav>
      <div className="navbar z-50">{children}</div>
    </nav>
  );
}

export function NavLink({ ...props }) {
  const currentPath = usePathname();
  return (
    <Link
      href={props.href}
      className={`nav-link ${currentPath === props.href ? "active" : " "}`}
    >
      {props.children}
    </Link>
  );
}

export const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdminRoute = pathname?.startsWith("/admin");

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    !isAdminRoute && (
      <Nav>
        <div className="nav-menu-button">
          <button onClick={toggleMenu}>|||</button>
          {isMenuOpen && (
            <div className="mobile-nav-links flex flex-col absolute  gap-4">
              <div className="home">
                <NavLink href="/">Home</NavLink>
              </div>
              <div className="produtos">
                <NavLink href="/produtos">Produtos</NavLink>
              </div>
              <div className="categorias">
                <NavLink href="/categorias">Categorias</NavLink>
              </div>
              {/* <CategoryDrop /> */}
              <div className="nav-about">
                <NavLink href="/sobreousadia">Sobre Ousadia</NavLink>
              </div>
              <div className="nav-contact">
                <NavLink href="/contacto">Contacto</NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="wide-screen-nav nav-links flex items-center gap-4">
          <div className="produtos">
            <NavLink href="/produtos">Produtos</NavLink>
          </div>
          <CategoryDrop />
          <div className="nav-about">
            <NavLink href="/sobreousadia">Sobre Ousadia</NavLink>
          </div>
          <div className="nav-contact">
            <NavLink href="/contacto">Contacto</NavLink>
          </div>
        </div>
        <div className="nav-icon">
          <NavLink href="/">
            <NavIcon />
          </NavLink>
        </div>
        <AccountDropDown />
      </Nav>
    )
  );
};
