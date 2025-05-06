import React from "react";

export default function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/xvgaadaz"
      method="POST"
      className="contact-form flex flex-col w-4/6 gap-4"
    >
      <div className="full-name flex flex-col gap-4">
        <input
          type="hidden"
          name="_text"
          id=""
          value="https://vesteousadia.com/contacto/obrigado"
        />
        <div className="flex justify-between ">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="flex justify-between ">
          <label htmlFor="apelido">Apelido</label>
          <input type="text" name="apelido" id="apelido" required />
        </div>
      </div>
      <div className="flex justify-between ">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" required />
      </div>
      <div className="flex justify-between ">
        <label htmlFor="assunto">Assunto</label>
        <input type="text" name="assunto" id="assunto" />
      </div>
      <div className="flex justify-between ">
        <label htmlFor="mensagem">Mensagem</label>
      </div>
      <div className="">
        <textarea
          className="flex w-full h-16 rounded-sm"
          name="mensagem"
          id="mensagem"
          required
        ></textarea>
      </div>
      <input type="submit" value="Enviar Mensagem" id="enviar" />
    </form>
  );
}
