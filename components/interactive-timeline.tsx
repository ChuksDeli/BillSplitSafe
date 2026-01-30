"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  IoPersonAddOutline,
  IoReceiptOutline,
  IoStatsChartOutline,
  IoCheckmarkCircleOutline,
  IoPizzaOutline,
  IoCafeOutline,
  IoMailOutline,
} from "react-icons/io5";

export function InteractiveTimeline() {
  const containerRef = useRef(null);

  const steps = [
    {
      number: "01",
      title: "Make an account",
      description:
        "Takes like 30 seconds. Email and password, that's it. No credit card, no weird verification emails.",
      detail: "Free forever",
      Icon: IoPersonAddOutline,
    },
    {
      number: "02",
      title: "Add your expenses",
      description:
        "Type in what you paid for and who was there. We'll figure out the math.",
      detail: "Pizza, rent, whatever",
      Icon: IoReceiptOutline,
    },
    {
      number: "03",
      title: "See who owes what",
      description:
        "Everything updates automatically. No spreadsheets, no calculators, no headaches.",
      detail: "Real-time balances",
      Icon: IoStatsChartOutline,
    },
    {
      number: "04",
      title: "Get paid back",
      description:
        "Send a friendly reminder or just show them the app. Keep everyone on the same page.",
      detail: "No awkwardness",
      Icon: IoCheckmarkCircleOutline,
    },
  ];

  return (
    <section className="relative py-32 px-8 lg:px-20 bg-[#FDFBF7] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-[#F4EDE3]/40 to-transparent" />

      <div className="relative max-w-350 mx-auto" ref={containerRef}>
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-baseline gap-3 mb-6">
            <div className="w-12 h-0.5 bg-[#5C4B3C]" />
            <span className="text-sm text-[#5C4B3C]/60 tracking-wide">
              The whole process
            </span>
          </div>

          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-semibold text-[#2B231C] leading-[0.95] tracking-tight mb-6 max-w-3xl">
            How it actually
            <br />
            <span className="font-light italic">works</span>
          </h2>

          <p className="text-xl text-[#5C4B3C]/80 max-w-2xl leading-relaxed">
            Four steps. No complexity. No learning curve. Just the stuff you
            need.
          </p>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="grid lg:grid-cols-12 gap-12 items-start"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div
                className={`lg:col-span-7 ${index % 2 === 1 ? "lg:col-start-6" : ""}`}
              >
                <div className="flex items-start gap-8">
                  <div className="shrink-0">
                    <div className="relative">
                      <div className="text-[5rem] font-light text-[#C9955C]/20 leading-none">
                        {step.number}
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <step.Icon className="text-4xl text-[#C9955C]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex-1">
                    <h3 className="text-3xl font-semibold text-[#2B231C] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-[#5C4B3C]/80 leading-relaxed mb-4 max-w-md">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4EDE3] rounded-full border border-[#C9955C]/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9955C]" />
                      <span className="text-sm text-[#5C4B3C] font-medium">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`lg:col-span-5 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                <motion.div
                  className="relative"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {index === 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-xl shadow-[#2B231C]/8 border border-[#2B231C]/8">
                      <div className="space-y-4">
                        <div className="h-12 bg-[#FDFBF7] rounded-lg border border-[#2B231C]/8 flex items-center px-4">
                          <span className="text-sm text-[#5C4B3C]/40">
                            your@email.com
                          </span>
                        </div>
                        <div className="h-12 bg-[#FDFBF7] rounded-lg border border-[#2B231C]/8 flex items-center px-4">
                          <span className="text-sm text-[#5C4B3C]/40">
                            ••••••••
                          </span>
                        </div>
                        <div className="h-12 bg-[#2B231C] rounded-lg flex items-center justify-center">
                          <span className="text-white font-medium">
                            Create account
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="bg-white rounded-2xl p-6 shadow-xl shadow-[#2B231C]/8 border border-[#2B231C]/8">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-[#FDFBF7] rounded-lg">
                          <IoPizzaOutline className="text-xl text-[#C9955C]" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#2B231C]">
                              Friday pizza
                            </div>
                            <div className="text-xs text-[#5C4B3C]/50">
                              $68.40
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#FDFBF7] rounded-lg">
                          <IoCafeOutline className="text-xl text-[#C9955C]" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#2B231C]">
                              Morning coffee
                            </div>
                            <div className="text-xs text-[#5C4B3C]/50">
                              $15.20
                            </div>
                          </div>
                        </div>
                        <div className="h-10 border-2 border-dashed border-[#C9955C]/30 rounded-lg flex items-center justify-center">
                          <span className="text-sm text-[#5C4B3C]/60">
                            + Add expense
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="bg-white rounded-2xl p-6 shadow-xl shadow-[#2B231C]/8 border border-[#2B231C]/8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline pb-4 border-b border-[#2B231C]/8">
                          <span className="text-sm text-[#5C4B3C]/60">
                            You owe
                          </span>
                          <span className="text-3xl font-semibold text-[#C67B5C]">
                            $34.10
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm text-[#5C4B3C]/60">
                            Owed to you
                          </span>
                          <span className="text-3xl font-semibold text-[#7A9B76]">
                            $41.60
                          </span>
                        </div>
                        <div className="pt-4 border-t-2 border-[#C9955C]/20">
                          <div className="text-xs text-[#5C4B3C]/50 mb-1">
                            Net balance
                          </div>
                          <div className="text-4xl font-semibold text-[#7A9B76]">
                            +$7.50
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 3 && (
                    <div className="bg-white rounded-2xl p-6 shadow-xl shadow-[#2B231C]/8 border border-[#2B231C]/8">
                      <div className="space-y-3">
                        <div className="p-4 bg-[#F4EDE3] rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-[#C9955C] flex items-center justify-center text-white text-xs font-bold">
                              A
                            </div>
                            <span className="text-sm font-medium text-[#2B231C]">
                              Alex
                            </span>
                          </div>
                          <div className="text-xs text-[#5C4B3C]/60 mb-2">
                            Owes you $34.10
                          </div>
                          <div className="h-8 bg-[#2B231C] rounded-md flex items-center justify-center gap-2">
                            <IoMailOutline className="text-white text-sm" />
                            <span className="text-white text-xs font-medium">
                              Send reminder
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-center text-[#5C4B3C]/40 italic py-2">
                          &quot;Hey! Just a heads up about the pizza&quot;
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-white rounded-2xl border border-[#2B231C]/8 shadow-xl shadow-[#2B231C]/8">
            <p className="text-lg text-[#5C4B3C]/80">
              That&apos;s literally it. No hidden steps, no confusing menus.
            </p>
            <button className="px-8 py-4 bg-[#2B231C] text-white font-medium rounded-lg hover:bg-[#3D332A] transition-colors">
              Start splitting bills
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
