import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Reveal } from "@/components/ui/reveal";

export function TestimonialSection() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-label="Client testimonials" className="py-20 sm:py-24">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.author} delay={i * 0.08}>
              <figure className="glass-card flex h-full flex-col gap-4 rounded-xl p-6">
                <Quote className="h-5 w-5 text-emerald-400/70" aria-hidden />
                <blockquote className="flex-1 text-sm leading-relaxed text-zinc-300">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-white/[0.06] pt-4">
                  <p className="text-sm font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-zinc-500">{testimonial.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
