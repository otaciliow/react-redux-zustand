import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from "lucide-react";

import { useStore } from '../zustand-store'
import { Lesson } from '../components/Lesson';

interface ModuleProps {
    title: string
    amountOfLessons: number
    moduleIndex: number
}

export function Module({title, amountOfLessons, moduleIndex}: ModuleProps) {
    console.log(amountOfLessons)
    const { currentModuleIndex, currentLessonIndex, play, lessons } = useStore(store => {
        return {
            lessons: store.courses?.modules[moduleIndex].lessons,
            currentModuleIndex: store.currentModuleIndex,
            currentLessonIndex: store.currentLessonIndex,
            play: store.play
        }
    })

    return (
        <>
            <Collapsible.Root className="group" defaultOpen={moduleIndex == 0}>
                <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4 hover:bg-zinc-900 cursor-pointer transition-all">
                    <span className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
                        {moduleIndex + 1}
                    </span>
                    <div className="flex flex-col gap-1 text-left">
                        <strong className="text-sm">{title}</strong>
                        <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
                    </div>

                    <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-all" />
                </Collapsible.Trigger>

                <Collapsible.Content>
                    <nav className="relative flex flex-col gap-4 p-6">
                        {lessons && lessons.map((lesson, lessonIndex) => {
                            const isCurrent = currentModuleIndex == moduleIndex && currentLessonIndex == lessonIndex

                            return (
                                <Lesson key={lesson.id} title={lesson.title} duration={lesson.duration} isCurrent={isCurrent} onPlay={() => play([moduleIndex, lessonIndex])} />
                            )
                        })}
                    </nav>
                </Collapsible.Content>
            </Collapsible.Root>
        </>
    )
}