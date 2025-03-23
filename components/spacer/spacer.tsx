type SpacerProps = {
    size: number
}

export default function Spacer({ size }: SpacerProps) {
    return (
        <div style={{ height: size * 8 }} />
    )
}