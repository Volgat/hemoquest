import type { Metadata } from 'next';
import { MedGemmaChatClient } from "@/components/game/MedGemmaChatClient";

export const metadata: Metadata = {
  title: 'Hemo — Health Guide | Hemo Quest',
  description: 'Ask Dr. Hemo, your AI health guide, any question about sickle cell disease — symptoms, genetics, treatments and daily management.',
};
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HealthGuidePage() {
    return (
        <div className="container mx-auto py-6 max-w-3xl h-full flex flex-col">
            <Button variant="ghost" asChild className="mb-4 self-start">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Body Map
                </Link>
            </Button>

            <div className="mb-5">
                <h1 className="text-3xl font-bold font-headline text-primary">Hemo — Health Guide</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Get answers to your questions about sickle cell disease from our AI expert.
                </p>
            </div>

            <div className="flex-1">
                <MedGemmaChatClient />
            </div>
        </div>
    );
}
