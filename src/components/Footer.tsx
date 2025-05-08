"use client";

import React from "react";
import { NavLink } from "./Nav";
import { FooterIcon } from "./NavIcon";
import { usePathname } from "next/navigation";
import Image from "next/image";

// import igIcon from "/assets/instagram.png";

export default function Footer() {
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");
  return (
    !isAdminRoute && (
      <footer>
        <section className="footer-section ">
          <div className="footer-media flex justify-between">
            <div className="footer-ousadia flex items-center gap-8">
              <div className="icon-ousadia h-40 flex items-center ">
                <NavLink href="/">
                  <FooterIcon />
                </NavLink>
              </div>
              <div className="footer-links flex flex-col gap-4">
                <div className="contact-icons flex justify-between">
                  <NavLink href="/">
                    <Image
                      src="/assets/facebook.png"
                      alt="facebook"
                      width={24}
                      height={24}
                    />
                  </NavLink>
                  <NavLink href="/">
                    <Image
                      src="/assets/instagram.png"
                      alt="instagram"
                      width={24}
                      height={24}
                    />
                  </NavLink>
                  <NavLink href="/">
                    <Image
                      src="/assets/whatsapp.png"
                      alt="whatsapp"
                      width={24}
                      height={24}
                    />
                  </NavLink>
                </div>
                <div className="page-links flex flex-col gap-2">
                  {/* <NavLink href="/produtos">Produtos</NavLink> */}
                  <NavLink href="/contacto">Contacto</NavLink>
                  {/* <NavLink href="/sobre">Sobre Ousadia</NavLink> */}
                  <NavLink href="/termos">Termos&Condições</NavLink>
                  <NavLink href="/privacidade">
                    Políticas de Privacidade
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="ousadia-media flex p-4 items-center ">
              <iframe
                width="100%"
                height="100"
                // scrolling="no"
                // frameborder="no"
                // allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1637922391&color=%233c6c7c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              ></iframe>
            </div>
          </div>

          <div className="footer-rights flex justify-between p-2">
            <p>© 2024 - Todos direitos reservados</p>
            <p className="footer-creator">
              Criado por:{` `}
              <a
                href="https://portfolio-arcidesferraos-projects.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Arcides Ferrao
              </a>
            </p>
          </div>
        </section>
      </footer>
    )
  );
}
