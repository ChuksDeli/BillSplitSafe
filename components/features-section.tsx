"use client";

import { motion } from "framer-motion";
import { Wallet, PieChart, Bell, Shield, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Track All Expenses",
    description:
      "Log every shared expense from rent to dinner. Keep a complete record of who paid what.",
  },
  {
    icon: PieChart,
    title: "Real-time Balances",
    description:
      "See exactly who owes whom at any moment. No more mental math or spreadsheets.",
  },
  {
    icon: Bell,
    title: "Payment Reminders",
    description:
      "Never forget to settle up. Get notified when it's time to pay your share.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your financial data stays safe. We use industry-standard security practices.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description:
      "Access your expenses from any device. Fully responsive and mobile-friendly.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Add expenses in seconds. Our interface is designed for speed and efficiency.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything You Need to{" "}
            <span className="text-primary">Split Smart</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make expense sharing effortless and
            transparent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
