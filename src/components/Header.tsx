import { MessageCircle, Loader } from "lucide-react";

import { useStore, useCurrentLesson } from '../zustand-store';

export function Header() {
    const { currentModule, currentLesson } = useCurrentLesson()
    const isLoading = useStore(store => store.isLoading)

    if (isLoading) {
        return <h1 className="text-2-xl font-bold flex items-center gap-1">Carregando <Loader className="h-3 w-3 text-zinc-400 animate-spin" /></h1>
    }

    return (
        <>
            <div className="flex flex-col gap-1">
                <h1 className="text-2-xl font-bold">{currentLesson?.title}</h1>
                <span className="text-sm text-zinc-400">Módulo "{currentModule?.title}"</span>
            </div>

            <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white cursor-pointer hover:bg-violet-600">
                <MessageCircle className="w-4 h-4" />
                Deixar feedback
            </button>
        </>
    )
}