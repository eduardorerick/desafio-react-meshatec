import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify'

interface PlaylistProviderProps {
  children: ReactNode;
}
interface PlaylistContextProps {
  playlists: CityProps[];
  savePlaylist: (playlistInput: PlaylistInputProps) => Promise<void>;
  removePlaylist: (id: string) => Promise<void>
}

interface CityProps {
  name: string;
  temp: number;
  genre: string;
  playlist?: PlaylistProps
  createdAt: string;
  id: string;
}

interface PlaylistProps {
  tracks: {
    key: string;
    images: {
      coverart: string
    };
    title: string;
    subtitle: string
  }[]
}

interface PlaylistInputProps {
  name: string;
  temp: number;
  genre: string;
  playlist?: PlaylistProps
}


export const PlaylistContext = createContext<PlaylistContextProps>({} as PlaylistContextProps);

export function PlaylistProvider({ children }: PlaylistProviderProps) {

  const successToast = () => {
    return toast.success('Playlist saved!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }

  const deleteToast = () => {
    return toast.info('Playlist deleted successfully', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
  }

  const [playlists, setPlaylists] = useState<CityProps[]>([])

  useEffect(() => {
    const returnURL = localStorage.getItem('playlists');
    if (returnURL) {
      const data = JSON.parse(returnURL)
      setPlaylists(data)
    }
  }, [])

  async function savePlaylist(playlistInput: PlaylistInputProps) {
    const playlist = {
      ...playlistInput,
      createdAt: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      id: uuid(),
    }
    setPlaylists([...playlists, playlist]);

    localStorage.setItem('playlists', JSON.stringify([
      ...playlists,
      playlist
    ]));
    successToast();


  }

  async function removePlaylist(id: string) {

    const newList = playlists.filter(playlist => (playlist.id != id))
    setPlaylists(newList)

    localStorage.setItem('playlists', JSON.stringify([
      ...newList
    ]));

    deleteToast();
  }

  return (
    <PlaylistContext.Provider value={{ playlists, savePlaylist, removePlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext)

  return context
}