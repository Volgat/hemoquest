'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Icons from '@/components/icons';
import type { LeaderboardUser } from "@/lib/types";

interface LeaderboardProps {
  users: LeaderboardUser[];
}

export function Leaderboard({ users }: LeaderboardProps) {
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Icons.Users />
          Leaderboard
        </CardTitle>
        <CardDescription>See how you stack up against other explorers.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow key={user.id} className={user.id === 'player' ? 'bg-primary/10' : ''}>
                <TableCell className="font-medium text-lg">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.username}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">{user.score.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
