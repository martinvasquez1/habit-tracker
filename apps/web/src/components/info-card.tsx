import { VariantProps, cva } from "class-variance-authority";

const infoCardStyles = cva(
  "flex flex-col justify-center items-center p-20 md:p-36 text-center",
  {
    variants: {
      variant: {
        default: "",
        solid: "bg-card rounded-lg border-[1px] border-border",
      },
    },
    defaultVariants: {
      variant: null,
    },
  }
);

export interface InfoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoCardStyles> {
  title: string;
  body: string;
}

export default function InfoCard({
  variant,
  title,
  body,
  ...props
}: InfoCardProps) {
  return (
    <div className={infoCardStyles({ variant })} {...props}>
      <h2 className="font-bold text-2xl">{title}</h2>
      <p className="text-lg">{body}</p>
    </div>
  );
}
