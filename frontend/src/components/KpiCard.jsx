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
      className="bg-card border border-white/10 rounded-2xl p-5 shadow-glow transition-all"
    >

      <p className="text-sm text-muted">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-3">
        {value}
      </h2>

      <p className="text-xs text-muted mt-2">
        {subtitle}
      </p>

    </motion.div>
  )
}

export default KpiCard