interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return (
        <div className="bg-card p-4 px-4 border border-border rounded-lg">
            {children}
        </div>
    )
}