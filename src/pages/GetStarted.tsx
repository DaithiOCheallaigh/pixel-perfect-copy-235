import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import ChatUI from "@/components/chat/ChatUI";

const GetStarted = () => {

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-foreground">
      <SEO title="Get Started" description="Answer a few quick questions about your business and Lacuna Digital will recommend the right website, booking or automation package for you in minutes." />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 pb-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Let's figure out what you need
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/50">
            Answer a few quick questions and I'll recommend the right package for your
            business — and connect you with Dave.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0b]/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
          style={{ height: "min(600px, 70vh)" }}
        >
          <ChatUI />
        </motion.div>
      </section>

          </div>
  );
};

export default GetStarted;
