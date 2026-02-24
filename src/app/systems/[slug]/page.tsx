import { systems } from "@/lib/game-data";
import { notFound } from "next/navigation";
import { MissionCard } from "@/components/game/MissionCard";
import { HealthTipsSection } from "@/components/game/HealthTipsSection";
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

      {/* Missions */}
      <h2 className="text-2xl font-bold font-headline mb-4 mt-8 flex items-center gap-2">
        Available Missions
        <span className="text-sm font-normal text-muted-foreground ml-2">
          ({system.missions.length} missions)
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {system.missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return systems.map((system) => ({
    slug: system.slug,
  }));
}
