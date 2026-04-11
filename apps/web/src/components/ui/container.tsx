interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={`${className} bg-card p-4 px-4 border border-border rounded-lg`}>
            {children}
        </div>
    )
}