import { SpriteGeneratorClient } from "@/components/game/SpriteGeneratorClient";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SpriteGeneratorPage() {
  return (
    <div className="container mx-auto py-6 max-w-5xl h-full flex flex-col">
      <Button variant="ghost" asChild className="mb-4 self-start">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Body Map
        </Link>
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline text-primary">Hemo Sprite Generator</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Create custom characters and sprites for Hemo Quest using our AI model.
        </p>
      </div>

      <div className="flex-1">
        <SpriteGeneratorClient />
      </div>
    </div>
  );
}
