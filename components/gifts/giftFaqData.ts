// Plain (NON-'use client') module so the server page can import this same array
// to emit FAQPage JSON-LD without the client-reference proxy bug. The visible
// <GiftFaq /> accordion and the page's JSON-LD MUST share THIS single source.
//
// Facts are locked to the verified gift-card policy: delivered instantly by
// email · valid 12 months from purchase · redeemable for ANY treatment at ANY
// Carisma Aesthetics clinic in Malta · non-refundable / not exchangeable for
// cash. Do not invent policy beyond these.

export const giftFaqs: { q: string; a: string }[] = [
  {
    q: "How quickly is the gift card delivered?",
    a: "Instantly. The moment your purchase is complete, your e-gift voucher is delivered by email, ready to forward to the lucky recipient or to print and hand over yourself. No waiting, no postage, no stress. Perfect even for a last-minute gift.",
  },
  {
    q: "How long is the gift card valid?",
    a: "Every Carisma Aesthetics gift card is valid for 12 months from the date of purchase, giving the recipient plenty of time to choose their treatment and book a moment that suits them.",
  },
  {
    q: "How does the recipient redeem it?",
    a: "It couldn't be simpler. The recipient brings their e-voucher, on their phone or printed, to their appointment and the value is applied at checkout. They can book online or call any of our clinics to arrange a time that works for them.",
  },
  {
    q: "Can the gift card be used on any treatment, at any clinic?",
    a: "Yes. A Carisma Aesthetics gift card is redeemable for ANY treatment at ANY of our clinics across Malta. From a glow-boosting facial to advanced skin and aesthetic treatments, the choice is entirely theirs.",
  },
  {
    q: "Can amounts be combined or used across more than one visit?",
    a: "Absolutely. The gift card value can be put toward a higher-priced treatment, and any remaining balance stays on the card to use at a future appointment, so nothing goes to waste within the 12-month validity.",
  },
  {
    q: "Can I personalise the message?",
    a: "Yes, and we encourage it. When you pick an occasion, you'll be able to add a personal message so your gift feels thoughtful and unmistakably from you. It's the easy way to make a beautiful gift feel even more meaningful.",
  },
  {
    q: "Is the gift card refundable?",
    a: "Gift cards are non-refundable and cannot be exchanged for cash. They are designed to be redeemed for treatments at any Carisma Aesthetics clinic in Malta.",
  },
  {
    q: "Do you offer physical gift cards?",
    a: "Our gift cards are digital, which means they arrive instantly and never get lost in the post. If you'd like a physical keepsake, simply print your e-voucher, it presents beautifully tucked inside a card.",
  },
];
