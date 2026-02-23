"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FAQS = [
  {
    question: "What is Casa?",
    answer:
      "Casa is a modular household management platform. Instead of one monolithic app, Casa lets you pick the modules you need — Kitchen for recipes and meal planning, Clean for cleaning schedules, Organize for home inventory — and skip the rest. It's your home, streamlined.",
  },
  {
    question: "Is Casa free?",
    answer:
      "Yes! Casa's core features are completely free, including recipe scaling, meal planning, cleaning schedules, and basic organization. Premium features like AI-powered suggestions, advanced analytics, and multi-household support will be available on a paid plan.",
  },
  {
    question: "What are modules?",
    answer:
      "Modules are self-contained feature sets within Casa. Each module focuses on one area of household management. You can use one module or all of them — they work independently but share data when it makes sense (like grocery lists from your meal plan).",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Casa is built as a Progressive Web App (PWA), which means it works beautifully on any device — phone, tablet, or desktop — right from your browser. Add it to your home screen for an app-like experience. Native apps are on the roadmap.",
  },
  {
    question: "How does Casa handle my data?",
    answer:
      "Your data stays yours. Casa uses industry-standard encryption and never sells your information. All data is stored securely, and you can export or delete your data at any time. We believe in privacy-first design.",
  },
  {
    question: "When does Casa launch?",
    answer:
      "We're currently in development with early access planned soon. Join the waitlist to be first in line — early users will get priority access and help shape the product.",
  },
];

export function FAQ() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section bg-card/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about Casa.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
