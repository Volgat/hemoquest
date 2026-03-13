import { systems } from "@/lib/game-data";
import { notFound } from "next/navigation";
import { HealthTipsSection } from "@/components/game/HealthTipsSection";
import { SystemMissions } from "@/components/game/SystemMissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SystemPage({ params }: { params: { slug: string } }) {
  const system = systems.find((s) => s.slug === params.slug);

  if (!system) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Body Map
        </Link>
      </Button>

      <Card className="mb-8 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="w-16 h-16 flex-shrink-0">
            <system.Icon className="w-full h-full text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-headline">{system.name}</CardTitle>
            <CardDescription className="text-base">{system.description}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Health Tips Section */}
      {system.healthTips && system.healthTips.length > 0 && (
        <HealthTipsSection tips={system.healthTips} />
      )}

      {/* Missions & Dynamic Generation */}
      <SystemMissions 
        systemName={system.name} 
        initialMissions={system.missions} 
      />
    </div>
  );
}

export async function generateStaticParams() {
  return systems.map((system) => ({
    slug: system.slug,
  }));
}
