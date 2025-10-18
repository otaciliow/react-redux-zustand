import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";
import { next } from '../store/slices/player'

export function VideoPlayer() {
    const dispatch = useDispatch()

    const lesson = useAppSelector(state => {
        const { currentModuleIndex, currentLessonIndex } = state.player

        const currentLesson = state.player.course.modules[currentModuleIndex].lessons[currentLessonIndex]

        return currentLesson
    })

    function handlePlayNext() {
        dispatch(next())
    }

    return (
        <>
            <div className="w-full bg-zinc-950 aspect-video">
                <ReactPlayer width="100%" height="100%" onEnded={handlePlayNext} playing controls src={`https://www.youtube.com/watch?v=${lesson.id}`} />
            </div>
        </>
    )
}