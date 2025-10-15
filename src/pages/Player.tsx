import { Header } from '../components/Header';
import { VideoPlayer } from '../components/Video'
import { Module } from '../components/Module';

export function VideoContainer() {
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
                    <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
                        <Module moduleIndex={0} title="Desvendando Redux" amountOfLessons={3} />
                        <Module moduleIndex={1} title="Desvendando Redux" amountOfLessons={3} />
                        <Module moduleIndex={2} title="Desvendando Redux" amountOfLessons={3} />
                    </aside>
                </main>
            </div>
        </div>
    )
}