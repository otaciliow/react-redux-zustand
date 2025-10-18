import { Video } from "lucide-react";

interface LessonProps {
    title: string
    duration: string
    onPlay: () => void
}

export function Lesson({title, duration, onPlay}: LessonProps) {

    return (
        <>
            <button onClick={onPlay} className="flex items-center gap-3 text-sm text-zinc-400 cursor-pointer hover:text-zinc-300 transition-all">
                <Video className="w-4 h-4" />
                <span>{title}</span>
                <span className="ml-auto font-mono text-xs">{duration}</span>
            </button>
        </>
    )
}