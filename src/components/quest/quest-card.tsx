import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icons from "@/components/icons";
import type { Quest, CompletedQuest } from "@/lib/types";

interface QuestCardProps {
  quest: Quest | CompletedQuest;
}

function QuestInfoItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-5 w-5 text-accent" />
      <span className="font-semibold">{label}:</span>
      <span className="capitalize">{value}</span>
    </div>
  );
}

export function QuestCard({ quest }: QuestCardProps) {
  const isCompleted = 'completedAt' in quest;
  
  const getIntensityVariant = (intensity: string) => {
    switch(intensity.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  }

  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <div>
                <CardTitle className="font-headline text-xl">{quest.activityName}</CardTitle>
                {isCompleted && (
                    <CardDescription className="text-xs">
                        Completed on {new Date(quest.completedAt).toLocaleDateString()}
                    </CardDescription>
                )}
            </div>
            {isCompleted && (
                 <Badge variant="outline" className="flex items-center gap-1 border-primary text-primary">
                    <Icons.Trophy className="h-3 w-3" />
                    +{quest.points} pts
                </Badge>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{quest.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <QuestInfoItem icon={Icons.Clock} label="Duration" value={quest.duration} />
            <QuestInfoItem icon={Icons.Target} label="Target" value={quest.targetMuscleGroup} />
            <div className="flex items-center gap-2 text-sm">
                <Icons.Flame className="h-5 w-5 text-accent" />
                <span className="font-semibold">Exertion:</span>
                <Badge variant={getIntensityVariant(quest.levelOfExertion)} className="capitalize">{quest.levelOfExertion}</Badge>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
