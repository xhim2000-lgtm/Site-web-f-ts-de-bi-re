import { useEffect, useRef, useState } from 'react'
import './Stats.css'

const stats = [
  { value: 200, prefix: '+', label: 'références artisanales' },
  { value: 50, label: 'brasseries partenaires' },
  { value: 1, prefix: 'J+', label: 'en zone urbaine' },
  { value: 79, prefix: '-', suffix: '%', label: 'de CO\u2082 vs bouteilles' },
]

function AnimatedNumber({ value, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const start = performance.now()

          const animate = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="stats__number">
      {prefix}{count}{suffix}
    </span>
  )
}

function Stats() {
  return (
    <section className="stats">
      <div className="stats__inner container">
        {stats.map((stat, i) => (
          <div key={i} className="stats__item">
            <AnimatedNumber
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
