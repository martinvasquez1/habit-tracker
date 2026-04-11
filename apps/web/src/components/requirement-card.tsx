import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { colors, colorsMesh } from "@/styles/main";
import { cva } from "class-variance-authority";

const imageStyles = cva("aspect-square shadow-none", {
  variants: {
    color: colorsMesh,
  },
  defaultVariants: {
    color: "null",
  },
});

interface RequirementCardProps {
  title: string;
  description: string;
  badge: string;
  color: keyof typeof colors;
}

export function RequirementCard({ title, description, badge, color }: RequirementCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div 
        className={cn(
          imageStyles({ color }),
          "dark:brightness-70 aspect-video w-full object-cover"
        )}>
      </div>
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{badge}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}