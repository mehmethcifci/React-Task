import {configureStore} from '@reduxjs/toolkit';
import {
    candidateSlice,
} from './features';
const store = configureStore({
    reducer:{
        candidate: candidateSlice,
    }     
});
export default store;