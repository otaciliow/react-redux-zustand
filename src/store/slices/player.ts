import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '..';

import { api } from '../../lib/axios'

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
}

const initialState: PlayerState = {
    courses: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true
}

export const loadCourse = createAsyncThunk('player/load', async () => {
    const response = await api.get('/courses/1')

    return response.data
})

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        play: (state, action) => {
            state.currentModuleIndex = action.payload[0]
            state.currentLessonIndex = action.payload[1]
        },
        next: (state) => {
            const nextLessonIndex = state.currentLessonIndex + 1
            const nextLesson = state.courses?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

            if (nextLesson) {
                state.currentLessonIndex = nextLessonIndex
            } else {
                const nextModuleIndex = state.currentModuleIndex + 1
                const nextModule = state.courses?.modules[nextModuleIndex]

                if (nextModule) {
                    state.currentModuleIndex = nextModuleIndex
                    state.currentLessonIndex = 0
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(loadCourse.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(loadCourse.fulfilled, (state, action) => {
            state.courses = action.payload
            state.isLoading = false
        })
    }
})

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions

export const useCurrentLesson = () => {
    return useAppSelector(state => {
            const { currentModuleIndex, currentLessonIndex } = state.player
    
            const currentModule = state.player.courses?.modules[currentModuleIndex]
            const currentLesson = state.player.courses?.modules[currentModuleIndex].lessons[currentLessonIndex]
    
            return { currentModule, currentLesson }
        }
    )
}