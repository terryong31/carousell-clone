import type { AccordionItem } from '@nuxt/ui'

export const faqItems = ref<AccordionItem[]>([
  {
    label: 'How can I pay for this listing?',
    content: 'Tap on the ‘Buy’ button to pay securely via Carousell. Pay directly with your credit/debit card, FPX Banking or GrabPay—no additional set-ups or wallet top-ups needed.'
  },
  {
    label: 'What is Buyer Protection?',
    content: 'Your purchase is covered by Buyer Protection when you pay via the ‘Buy’ button. This means you’ll get a full refund if the item doesn’t arrive, is damaged during delivery, or is not what you saw in the listing.'
  },
  {
    label: 'How do I request for a return or refund?',
    content: 'Just tap on ‘Return/refund’ on your order details page if something goes wrong with your order. Carousell will reach out to you via email within 24h to resolve the issue.'
  }
])
