import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify"

function useSongInfo() {

    const spoyifyApi = useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spoyifyApi.getAccessToken()}`,
                        }
                    }
                ).then(res => res.json());
                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo();
    }, [currentIdTrack, spoyifyApi])

    return songInfo;
}
export default useSongInfo
