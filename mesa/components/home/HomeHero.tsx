"use client";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/Variants";
import { transition1 } from "@/lib/Transition";

const HomeHero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition1}
      className="section"
    >
      <motion.div className="home-hero-bg home-hero-banner-bg relative pt-16 pb-44 sm:pt-14 sm:pb-32 min-h-[700px] sm:min-h-[85vh] sm:h-[85vh] w-full flex items-center">
        <motion.div className="container flex items-center h-full">
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-4 sm:gap-8 w-full px-6 md:px-12">
            <motion.div
              variants={fadeIn("down", "tween", 0.2, 0.8)}
              initial="hidden"
              whileInView={"show"}
              exit={"show"}
              className="basis-full sm:basis-2/3 order-last sm:order-first"
            >
              <div className="sm:max-w-xl">
                <div className="space-y-4 mb-8 mt-48">
                  <Typography
                    variant="h1"
                    className="hidden sm:block leading-[3rem] text-white sm:leading-none"
                  >
                    Expand Smarter with
                  </Typography>

                  <Typography
                    variant="h1"
                    className="leading-[3rem] sm:leading-none"
                  >
                    <span className="sm:hidden text-white">
                      Expand Smarter with{" "}
                    </span>
                    <span> </span>
                    <span className="sm:hidden text-secondary">
                      AI-Powered Market insights
                    </span>
                  </Typography>

                  <Typography
                    variant="h1"
                    className="text-secondary leading-[3rem] sm:leading-none hidden sm:block mt-4"
                  >
                    AI-Powered Market insights
                  </Typography>
                </div>

                <Typography
                  variant="h6"
                  className="max-w-[80%] mb-10 text-secondary"
                >
                  With our Market Expansion Strategist Assistant, make informed
                  decisions faster with real-time, data-driven insights tailored
                  to your growth strategy.
                </Typography>

                <div className="flex mt-10 sm:mt-14 gap-4">
                  <a
                    // href={process.env.NEXT_PUBLIC_APPLICATION_FORM_LINK}
                    href=""
                    target="_blank"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-36 sm:w-48 "
                    >
                      Get Started
                    </Button>
                  </a>

                  {/* <a
                    href={process.env.NEXT_PUBLIC_NOMINATION_FORM_LINK}
                    target="_blank"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      color="primary"
                      className="w-36 sm:w-48"
                    >
                      Nominate a Startup
                    </Button>
                  </a> */}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HomeHero;
