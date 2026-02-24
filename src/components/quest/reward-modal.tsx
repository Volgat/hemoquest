import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icons from '@/components/icons';
import type { Reward } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface RewardModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  reward: Reward | null;
  points: number;
}

const badgeImage = PlaceHolderImages.find(img => img.id === 'badge-award');

export function RewardModal({ isOpen, onOpenChange, reward, points }: RewardModalProps) {
  if (!reward) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <DialogHeader className="items-center">
          <DialogTitle className="font-headline text-2xl">Quest Complete!</DialogTitle>
          <DialogDescription>You have earned a new reward for your efforts.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
            {badgeImage && (
                <Image
                    src={badgeImage.imageUrl}
                    alt={badgeImage.description}
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-primary shadow-lg"
                    data-ai-hint={badgeImage.imageHint}
                />
            )}
          <h3 className="text-lg font-semibold text-primary">{reward.badgeDescription}</h3>
          <p className="text-muted-foreground">{reward.rewardDescription}</p>

          <Badge variant="default" className="text-base px-4 py-2">
            <Icons.Trophy className="mr-2 h-5 w-5" />
            +{points} Points
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
}
