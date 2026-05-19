import { motion } from "framer-motion"

function KpiCard({
  title,
  value,
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="bg-card border border-white/10 rounded-2xl p-5 shadow-glow hover:border-accent/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300"
    >

      <p className="text-sm text-muted">
        {title}
      </p>

      <h3 className="text-4xl font-bold mt-4 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
        {value}
      </h3>

      <p className="text-xs text-muted mt-2">
        {subtitle}
      </p>

    </motion.div>
  )
}

export default KpiCard