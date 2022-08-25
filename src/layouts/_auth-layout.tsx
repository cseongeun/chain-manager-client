import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/layouts/_dashboard';
import { fadeInBottom } from '@/libs/framer-motion/fade-in-bottom';

export default function AuthLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <DashboardLayout authPage={true}>
      <div className="pt-8 text-sm xl:pt-10">
        <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-5 pt-4 shadow-card dark:bg-light-dark xs:p-6 xs:pt-5">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              initial="exit"
              animate="enter"
              exit="exit"
              variants={fadeInBottom('easeIn', 0.25)}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
