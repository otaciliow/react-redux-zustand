import { create } from 'zustand';

import { api } from '../lib/axios';

interface Course {
    id: number
    modules: Array<{
        id: number
        title: string
        lessons: Array<{
            id: string
            title: string
            duration: string
        }>
    }>
}

export interface PlayerState {
    courses: Course | null
    currentModuleIndex: number
    currentLessonIndex: number
    isLoading: boolean

    play: (moduleAndLessonIndex: [number, number]) => void
    next: () => void
    load: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
    return {
        courses: null,
        currentModuleIndex: 0,
        currentLessonIndex: 0,
        isLoading: true,

        play: (moduleAndLessonIndex: [number, number]) => {
            const [moduleIndex, lessonIndex] = moduleAndLessonIndex

            set({
                currentModuleIndex: moduleIndex,
                currentLessonIndex: lessonIndex
            })
        },

        next: () => {
            const { currentModuleIndex, currentLessonIndex, courses } = get()

            const nextLessonIndex = currentLessonIndex + 1
            const nextLesson = courses?.modules[currentModuleIndex].lessons[nextLessonIndex]

            if (nextLesson) {
                set({ currentLessonIndex: nextLessonIndex })
            } else {
                const nextModuleIndex = currentModuleIndex + 1
                const nextModule = courses?.modules[nextModuleIndex]

                if (nextModule) {
                    set({
                        currentModuleIndex: nextModuleIndex,
                        currentLessonIndex: 0
                    })
                }
            }
        },

        load: async () => {
            set({ isLoading: true })

            const response = await api.get('/courses/1');
            
            set({ 
                courses: response.data, 
                isLoading: false
             })
        }
    }
})