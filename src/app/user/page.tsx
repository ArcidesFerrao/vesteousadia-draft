import React from "react";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import db from "@/db/db";
import UserPageClient from "./UserPageClient";
// import { Order } from "@prisma/client";
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
export default async function UserPage() {
  const session = await getServerSession(authOptions);
  let orders: Order[] = [];
  if (!session) {
    return (
      <main className="items-center justify-center">
        You are not logged in.
      </main>
    );
  } else if (session.user.email) {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        orders: {
          include: {
            product: true,
          },
        },
      },
    });

    orders = (user?.orders || []).map((order) => ({
      id: order.id,
      product: {
        name: order.product.name,
        image: order.product.imageUrl,
      },
      price: order.price,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    }));
  }

  return <UserPageClient session={session} orders={orders} />;
}
