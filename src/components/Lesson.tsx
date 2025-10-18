import { Video, PlayCircle } from "lucide-react";

interface LessonProps {
    title: string
    duration: string
    isCurrent?: boolean
    onPlay: () => void
}

export function Lesson({title, duration, isCurrent = false ,onPlay}: LessonProps) {

    return (
        <>
            <button 
                onClick={onPlay} 
                data-active={isCurrent}
                disabled={isCurrent}
                className="flex items-center gap-3 text-sm text-zinc-400 cursor-pointer enabled:hover:text-zinc-200 transition-all data-[active=true]:text-emerald-400"
            >
                {isCurrent ? (
                    <PlayCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                    <Video className="w-4 h-4" />
                )}
                <span>{title}</span>
                <span className="ml-auto font-mono text-xs">{duration}</span>
            </button>
        </>
    )
}