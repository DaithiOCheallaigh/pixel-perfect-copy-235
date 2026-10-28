import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { ShineBorder } from "./ui/shine-border";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

const testimonials = [
  {
    name: "Claire Openshaw",
    text: "As a therapist, the idea of designing a website for my practice felt overwhelming, to say the least. From the very beginning, Dave put all of my worries at ease — and the process turned out to be genuinely enjoyable. His deep knowledge of everything that goes into creating a website allowed me to focus on my aesthetic vision, knowing the technical details were in expert hands. I've received countless compliments on my website, and I truly smile every time I see it. I wholeheartedly recommend working with him!",
  },
  {
    name: "Patrick Rooney",
    text: "I had found it frustrating to find an effective digital expert to assist with our online presence for some time so we have found it fantastic to work with Dave. His attention to detail is second to none, has made excellent cost effective recommendations and he is very pleasant to deal with. We have noticed a significant increase in traffic. Highly recommend.",
  },
  {
    name: "Robert Doyle",
    text: "Lacuna were brilliant to deal with and I can highly recommend them to anyone considering help with their digital platforms. Dave helped us with brand concept and design right the way through to delivery. Nothing was too much trouble and their collaborative approach made the whole experience enjoyable and pain free.",
  },
  {
    name: "Dan Dold",
    text: "Lacuna Digital was fantastic at helping me design and set up my website. They were easy to work with, and their communication was excellent, always putting my needs first. I appreciated their willingness to provide valuable feedback, even if it meant suggesting something different from what I initially wanted. Their expertise has significantly boosted my business. Highly recommend!",
  },
];

const SocialProof = () => {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Social Proof</SectionLabel>
          <div className="mb-4 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl text-primary">★</span>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">5.0 of 5 — Google Reviews</span>
          </div>
        </ScrollReveal>

        <Carousel opts={{ align: "start", loop: true }} className="mt-8 w-full">
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="pl-4 md:basis-1/3">
                <div className="relative flex h-full flex-col rounded-xl bg-card p-8">
                  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    "{testimonial.text}"
                  </p>
                  <p className="mt-6 text-sm font-semibold text-foreground">— {testimonial.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default SocialProof;
