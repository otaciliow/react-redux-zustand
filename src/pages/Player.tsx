import { useEffect } from 'react'

import { Header } from '../components/Header';
import { VideoPlayer } from '../components/Video'
import { Module } from '../components/Module';
import { useStore, useCurrentLesson } from '../zustand-store';

export function VideoContainer() {
    const courses = useStore(store => store.courses)
    const load = useStore(store => store.load)

    const { currentLesson } = useCurrentLesson()

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (currentLesson) {
            document.title = `Assistindo: ${currentLesson.title}`
        }
    }, [])

    return (
        <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
            <div className="flex w-[1100px] flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Header />
                </div>

                <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
                    <div className="flex-1">
                        <VideoPlayer />
                    </div>
                    <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
                        { courses?.modules && courses?.modules.map((module, index) => {
                            return (
                                <Module key={module.id} moduleIndex={index} title={module.title} amountOfLessons={module.lessons.length} />
                            )
                        }) }
                    </aside>
                </main>
            </div>
        </div>
    )
}