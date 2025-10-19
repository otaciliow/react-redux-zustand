import ReactPlayer from "react-player";
import { Loader } from 'lucide-react'

import { useStore, useCurrentLesson } from '../zustand-store';

export function VideoPlayer() {
    const { next, isLoading } = useStore(store => {
        return {
            next: store.next,
            isLoading: store.isLoading
        }
    })

    const { currentLesson } = useCurrentLesson()

    function handlePlayNext() {
        console.log('chamou handlePlayNext')
        next()
    }

    if (!currentLesson) {
        return null
    }

    return (
        <>
            <div className="w-full bg-zinc-950 aspect-video">
                { isLoading ? (
                    <div className="flex h-full items-center justify-center">
                        <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
                    </div>
                ) : (
                    <ReactPlayer key={currentLesson.id} width="100%" height="100%" onEnded={handlePlayNext} playing controls src={`https://www.youtube.com/watch?v=${currentLesson.id}`} />
                ) }
            </div>
        </>
    )
}