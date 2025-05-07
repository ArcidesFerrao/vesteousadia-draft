"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface Order {
  id: number;
  product: {
    name: string;
    image: string;
  };
  createdAt: Date;
  status: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface UserPageClientProps {
  session: Session;
  orders: Order[];
}
export default function UserPageClient({
  session,
  orders,
}: UserPageClientProps) {
  const user = session.user;

  return (
    <main>
      <div className="flex justify-between">
        <div className="flex gap-8 p-4 items-center">
          <Image
            src={user.image ?? "/default-avatar.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <button onClick={() => signOut()}>Logout</button>
      </div>
      <div className="flex flex-col gap-16">
        <h2>Pedidos</h2>
        <div>
          {user ? (
            orders.length > 0 ? (
              <ul className="flex flex-wrap gap-8">
                {orders.map((order) => (
                  <li key={order.id} className="user-order flex gap-4">
                    <Image
                      className="rounded-full"
                      src={order.product.image}
                      alt="Product Image"
                      width={160}
                      height={160}
                    />
                    <div className="flex flex-col justify-around">
                      <p>
                        <strong>Order ID:</strong> {order.id}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Total:</strong> {order.totalPrice.toFixed(2)}
                      </p>
                      <p>
                        <strong>Placed:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have no orders yet.</p>
            )
          ) : (
            <p>Login to see orders</p>
          )}
        </div>
      </div>
    </main>
  );
}
