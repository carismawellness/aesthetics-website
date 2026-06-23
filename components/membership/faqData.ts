/**
 * MEMBERSHIP_FAQS — single source of truth for the Carisma Aesthetics
 * Glow Club membership FAQ.
 *
 * PLAIN module (NOT "use client") on purpose: the membership page imports this
 * to build the page-scoped `FAQPage` JSON-LD on the SERVER, while the visible
 * <MembershipFaq /> component renders the very same array. Keeping it here means
 * the structured data and the visible answers can never drift apart.
 *
 * Copy/facts/pricing extracted faithfully from the original
 * components/MembershipPage.tsx FAQ section — wording is preserved verbatim so
 * the schema continues to match the visible content.
 */

export type MembershipFaq = { q: string; a: string };

export const MEMBERSHIP_FAQS: MembershipFaq[] = [
  {
    q: "What is The GLOW CLUB Membership?",
    a: "The Glow Club is an exclusive membership program designed to reward our most dedicated and local customers by offering discounts on their favorite services and products, while also providing the flexibility to explore exciting new offerings.",
  },
  {
    q: "May I use The GLOW CLUB discount to purchase packages or other discounted services?",
    a: "Unfortunately, the Glow Club discount cannot be used for packages, already discounted services, or promotional offers. However, you are welcome to use the discount for purchasing gift cards and products.",
  },
  {
    q: "How is this different from a traditional membership program?",
    a: 'Unlike traditional spa memberships that often follow a "use it or lose it" model, our program operates more like a flexible savings account. You can save funds each month, giving you the freedom to choose your preferred aesthetic procedure. When you\'re ready for your appointment, you\'ll not only benefit from a discount on the service but also have the option to select the products you desire.',
  },
  {
    q: "How long am I committed to the program?",
    a: "You are committed to the program for a minimum of 1 month. After this initial period, you have the flexibility to cancel your membership at any time. However, the first month is non-refundable, but you can use the amount as credit on your second procedure with us once you join the membership.",
  },
  {
    q: "If I cancel, can I get a refund?",
    a: "Absolutely. Although the first month is non-refundable, if you have more monthly payments, they will be refunded. You can use the first month's payment as a credit for your second procedure with us after you join the Glow Club.",
  },
  {
    q: "May I use funds in my GLOW CLUB account to pay for friends or family members services?",
    a: "No, the funds in your Glow Club account are exclusively intended for your own use and cannot be applied to pay for services for friends or family members.",
  },
  {
    q: "What services can I use my GLOW CLUB membership for?",
    a: "With your Glow Club membership, you can enjoy a 10% discount on all aesthetic services and a generous 15% discount when purchasing any retail products.",
  },
  {
    q: "How do I sign up for this membership?",
    a: "Signing up is straightforward. All you need to do is select the monthly deposit amount that suits you best and provide your personal details to create your membership account. We look forward to welcoming you aboard!",
  },
  {
    q: "When will my credit card be charged?",
    a: "Your credit card will be charged on the same day of the month as your initial purchase for the membership. This ensures a consistent billing cycle for your convenience.",
  },
  {
    q: "What happens if a card is declined?",
    a: "In the event of a declined card, we will prompt you to update your card information. If the issue persists, your Glow Club balance will not be replenished until a valid card is provided.",
  },
  {
    q: "Is there a monthly fee?",
    a: "No, there is no monthly fee associated with our membership. You will only be charged the specific amount that you choose during the sign-up process.",
  },
  {
    q: "What happens to my monthly deposit?",
    a: "Your monthly deposit is credited to your Glow Club account, where it can be used to purchase services or products with the special benefits and discounts offered by the club.",
  },
  {
    q: "How do the monthly payments work?",
    a: "Each month, the chosen amount will be automatically charged to your card to cover your membership contribution.",
  },
  {
    q: "Can I use multiple discounts?",
    a: "Unfortunately, multiple discounts cannot be applied to services that are already discounted or part of promotional offers.",
  },
  {
    q: "Do I need to deposit the same amount every month?",
    a: "No, you have the flexibility to adjust the deposit amount as you wish each month, giving you the freedom to tailor your membership to your needs.",
  },
  {
    q: "How much time do I need to wait after deposit to purchase the service or product?",
    a: "There is no waiting period; you can start using the discount for members immediately. Note that the first month payment is non-refundable.",
  },
  {
    q: "What's the minimum and maximum amount that I can deposit?",
    a: "The minimum monthly deposit allowed is €20, while the maximum is €200 per month. This range provides you with the freedom to choose an amount that suits your budget.",
  },
  {
    q: "How do I cancel my membership?",
    a: "You have two convenient options to cancel your membership. You can either send an email to info@carismaaesthetics.com or access the cancellation feature on the membership portal.",
  },
];
