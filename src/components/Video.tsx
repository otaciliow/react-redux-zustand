import ReactPlayer from "react-player";

import { useCurrentLesson } from "../store/slices/player";
import { next } from '../store/slices/player'
import { useAppDispatch } from '../store'

export function VideoPlayer() {
    const dispatch = useAppDispatch()

    const { currentLesson } = useCurrentLesson()

    function handlePlayNext() {
        dispatch(next())
    }

    if (!currentLesson) {
        return null
    }

    return (
        <>
            <div className="w-full bg-zinc-950 aspect-video">
                <ReactPlayer width="100%" height="100%" onEnded={handlePlayNext} playing controls src={`https://www.youtube.com/watch?v=${currentLesson.id}`} />
            </div>
        </>
    )
}