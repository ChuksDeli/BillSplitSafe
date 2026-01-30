"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FloatingCTA() {
  return (
    <section className="relative py-32 px-8 lg:px-20 bg-[#F4EDE3] overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9955C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9955C]/10 rounded-full blur-3xl" />

      <div className="relative max-w-300 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Main CTA Card */}
          <div className="relative bg-white rounded-3xl p-12 lg:p-20 shadow-2xl shadow-[#2B231C]/10 border border-[#2B231C]/8">
            {/* Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C9955C] via-[#C67B5C] to-[#C9955C]" />

            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4EDE3] rounded-full mb-8 border border-[#C9955C]/20"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-[#C9955C]" />
                <span className="text-sm text-[#5C4B3C] font-medium">
                  Join hundreds of users
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold text-[#2B231C] leading-[0.95] tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Ready to stop
                <br />
                <span className="font-light italic">stressing?</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-xl text-[#5C4B3C]/80 leading-relaxed mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Start tracking expenses with your friends and roommates. No
                credit card, no commitment, no BS. Just simple bill splitting.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/signup">
                  <motion.button
                    className="px-10 py-5 bg-[#2B231C] text-white font-medium rounded-md hover:bg-[#3D332A] transition-colors shadow-lg shadow-[#2B231C]/20"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create your account
                  </motion.button>
                </Link>

                <Link href="/about">
                  <button className="px-10 py-5 text-[#5C4B3C] font-medium hover:text-[#2B231C] transition-colors">
                    Learn more →
                  </button>
                </Link>
              </motion.div>

              {/* Trust line */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#5C4B3C]/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <span>Always free</span>
                <span>·</span>
                <span>30 second setup</span>
                <span>·</span>
                <span>No payment info needed</span>
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#C9955C]/30" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#C9955C]/30" />
          </div>

          {/* Bottom note */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-[#5C4B3C]/60 italic">
              &quot;Best decision we made for managing house expenses&quot; —
              Jamie, roommate of 4
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
