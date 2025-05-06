import React from "react";

export default function BuyPage() {
  return (
    <main>
      <div className="product-buy">
        <div className="pic-buy"></div>
        <div className="info-buy">
          <h3>Product name</h3>
          <h4>Product price</h4>
          <p>Product quantity</p>
          <h3>Total: </h3>
        </div>
        <div className="buy-product-options">
          <h3>M-Pesa</h3>
          <p>M-Pesa Mocambique: </p>
          <p>Nome: </p>
          <p>
            Logo que fizer o pagamento por favor envie o comprovativo por
            whatsapp para o número +258 850688270 mencionando o número/código de
            compra
          </p>
        </div>
      </div>
    </main>
  );
}
