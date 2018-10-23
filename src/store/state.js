import { playMode } from '../assets/js/config';
import { loadSearch, loadFavorite, loadPlay } from "../assets/js/cach";

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: {},
    searchHistory: loadSearch(),
    playHistory: loadPlay(),
    favoriteList: loadFavorite()
};

export default state;