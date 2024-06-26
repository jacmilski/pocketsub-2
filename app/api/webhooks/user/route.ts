import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { prisma } from "../../../../lib/db";
import { ObjectId } from "bson";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

interface User {
  email: string;
  name: string;
  owner?: string;
}

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();

  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as Event;

    const eventType = evt.type;
    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, username } = evt.data;

      const user: User = {
        email: email_addresses[0].email_address,
        name: username,
        owner: id,
      };

      const data = await prisma.user.upsert({
        where: { email: email_addresses[0].email_address },
        create: user,
        update: {
          email: email_addresses[0].email_address,
        },
      });
      return NextResponse.json({ status: 200 });
    }
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }
}

type Event = {
  data: {
    email_addresses: { id: string; email_address: string }[];
    username: string;
    id: string;
    owner?: String;
  };
  object: string;
  type: string;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
