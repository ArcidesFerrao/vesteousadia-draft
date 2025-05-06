"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  // const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xvgaadaz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        toast.success("Mensagem enviada com sucesso!");
      } else {
        toast.error("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
      console.error("Erro ao enviar: ", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form flex flex-col w-4/6 gap-8"
    >
      <div className="full-name flex  gap-4">
        <div className="flex justify-between w-full">
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nome"
            required
          />
        </div>
        <div className="flex justify-between w-full">
          {/* <label htmlFor="apelido">Apelido</label> */}
          <input
            type="text"
            name="apelido"
            id="apelido"
            placeholder="Apelido"
            required
          />
        </div>
      </div>
      <div className="flex justify-between ">
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="flex justify-between ">
        {/* <label htmlFor="assunto">Assunto</label> */}
        <input type="text" name="assunto" id="assunto" placeholder="Assunto" />
      </div>
      {/* <div className="flex justify-between ">
        <label htmlFor="mensagem">Mensagem</label>
      </div> */}
      <div className="">
        <textarea
          className="flex w-full rounded-sm"
          name="mensagem"
          id="mensagem"
          placeholder="Em que podemos ajudar?"
          required
        ></textarea>
      </div>
      <input
        type="submit"
        value={isSending ? "Enviando..." : "Enviar Mensagem"}
        className="my-4"
        id="enviar"
      />
    </form>
  );
}
