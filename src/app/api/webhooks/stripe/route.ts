import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { planIdFromPriceId } from "@/lib/billing";

export async function POST(request: Request) {
  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const coachId = session.metadata?.coach_id;
      if (!coachId || !session.subscription) break;

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const priceId = subscription.items.data[0]?.price.id;
      const planId = priceId ? planIdFromPriceId(priceId) : null;

      await supabase
        .from("coaches")
        .update({
          stripe_subscription_id: subscription.id,
          plan: planId ?? "trialing",
        })
        .eq("id", coachId);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0]?.price.id;
      const planId = priceId ? planIdFromPriceId(priceId) : null;

      if (planId && subscription.status === "active") {
        await supabase
          .from("coaches")
          .update({ plan: planId })
          .eq("stripe_customer_id", subscription.customer as string);
      } else if (
        subscription.status === "canceled" ||
        subscription.status === "unpaid"
      ) {
        await supabase
          .from("coaches")
          .update({ plan: "canceled" })
          .eq("stripe_customer_id", subscription.customer as string);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("coaches")
        .update({ plan: "canceled", stripe_subscription_id: null })
        .eq("stripe_customer_id", subscription.customer as string);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
