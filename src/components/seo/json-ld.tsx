import type { JsonLd } from "@/lib/jsonld";

interface JsonLdProps {
  data: JsonLd | JsonLd[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}