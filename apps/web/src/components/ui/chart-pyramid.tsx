import { useCallback } from "react";

import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    RenderableText,
    TooltipValueType,
    CartesianGrid,
    TooltipPayload,
} from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ChartPyramidProps {
    title: string;
    description?: string;
    values: number[];
    config: ChartConfig;
}

interface MyTooltipData {
    realValue: number;
    left: number;
    right: number;
}

export function tooltipFormatter(
    _value: TooltipValueType | undefined,
    _name: string | number | undefined,
    item?: TooltipPayload,
    _index?: number,
    _payload?: TooltipPayload[]
): React.ReactNode {
    if (!item) return null;

    const typedItem = item as any as { payload: MyTooltipData; dataKey: string };

    // Only show one value
    if (typedItem.dataKey !== "right") return null;

    return (
        <div className="flex flex-1 justify-between leading-none">
            <div className="grid gap-1.5">
                <span className="text-muted-foreground">Value</span>
            </div>
            <span className="font-mono font-medium text-foreground tabular-nums">
                {typedItem.payload.realValue}
            </span>
        </div>
    );
}

function formatPercent(val: RenderableText | TooltipValueType): string {
    return `${Math.abs(Number(val)).toFixed(1)}%`;
}

/**
 * Pyramid chart that accepts an array of numbers
 */
export function ChartPyramid({ title, description, values, config }: ChartPyramidProps) {
    const total = values.reduce((sum, v) => sum + v, 0);

    const data = values.map((v, index) => ({
        age: `Group ${index + 1}`,
        realValue: v,
        left: -(v / total) * 100,
        right: (v / total) * 100,
    }));

    const memoizedTooltipFormatter = useCallback(tooltipFormatter, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>

            <CardContent>
                <ChartContainer config={config}>
                    <BarChart
                        id="pyramid-chart"
                        data={data}
                        layout="vertical"
                        stackOffset="sign"
                        barCategoryGap="12%"
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            type="number"
                            domain={[-100, 100]}
                            tickFormatter={formatPercent}
                            hide={true}
                        />
                        <YAxis
                            width={80}
                            type="category"
                            dataKey="age"
                            label={{ value: 'Groups', angle: -90, position: 'insideLeft', offset: 10 }}
                            hide={true}
                        />

                        <Bar
                            stackId="sameId"
                            name="Right"
                            dataKey="right"
                            fill={`var(--color-desktop)`}
                            radius={[0, 10, 10, 0]}
                        />
                        <Bar
                            stackId="sameId"
                            name="Left"
                            dataKey="left"
                            fill={`var(--color-desktop)`}
                            radius={[0, 10, 10, 0]}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel formatter={memoizedTooltipFormatter as any} />}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}