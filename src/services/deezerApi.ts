

const genreCodes = {
  Rock: 10314010,
  Pop: 427101360,
  Classica: 48581697,
  Lofi: 357449155,
}

interface PlayListProps {
  tracks: {
    key: string;
    images: {
      coverart: string
    };
    title: string;
    subtitle: string
  }[]
}


export const getPlaylist = async (genre: string): Promise<PlayListProps> => {
  const genreNumber = genre == "Rock" ? genreCodes.Rock :
    genre == "Pop" ? genreCodes.Pop :
      genre == "Classica" ? genreCodes.Classica : genreCodes.Lofi;

  const response = await fetch(`https://shazam.p.rapidapi.com/songs/list-recommendations?key=${genreNumber}&locale=en-US`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "shazam.p.rapidapi.com",
      "x-rapidapi-key": "a1db4a1454msh4ffc5a63e89502ep19a464jsna28e3f71dcad"
    }
  })
  const data = await response.json();

  return data;
}
