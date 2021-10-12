import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Spinner, Text, Button, Image, Select, Input, HStack, Box, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import { usePlaylist } from '../contexts/PlaylistContext'
import { useEffect, useState } from 'react'
import { getWeather } from '../services/weatherApi'
import { getPlaylist } from '../services/musicApi'
import { PlaylistCard } from '../components/PlaylistCard'
import { toast } from 'react-toastify';


interface CityProps {
  name: string;
  temp: number;
  genre: string;
  playlist?: PlaylistProps
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


const Home: NextPage = () => {
  const { savePlaylist } = usePlaylist();
  const [cityName, setCityName] = useState('');
  const [cityCard, setCityCard] = useState<CityProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputError = () => {
    return toast.error('Please type a valid city name!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });;
  }
  
  async function createPlaylist(playlist: CityProps) {
    await savePlaylist(playlist)
  }

  return (
    <>
      <Head>
        <title>Desafio React Mesha</title>
        <meta name="description" content="Desafio React para vaga na Mesha Tecnologia" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Flex direction='column' align='center' justify='center' p='8'>
        <Text fontSize='5xl' textAlign='center'>
          Find the best playlist here!
        </Text>

        <Flex >
          {isLoading ? <Spinner size='xl' /> :
            <HStack spacing='8'>
              <Input
                placeholder='Digite a cidade aqui'
                value={cityName}
                onChange={e => setCityName(e.target.value)}
                bg='white'
                _hover={{
                  bg: 'gray.100',
                }}
                _focus={{
                  bg: 'white',
                }}
                h='14'
                w='md'
              />

              <Button
                onClick={async () => {
                  if (cityName == '') {
                    return inputError()
                  }
                  setIsLoading(true);
                  const cityData = await getWeather(cityName);
                  const playlist = await getPlaylist(cityData.genre);
                  await setCityCard([...cityCard,
                  {
                    name: cityData.name,
                    temp: cityData.temp,
                    genre: cityData.genre,
                    playlist: playlist
                  }]);
                  setIsLoading(false);
                }}
                h='14'
                bg='white'
                _hover={{ bg: 'gray.100' }}>
                <Text> Search your playlist!</Text>
              </Button>
            </HStack>
          }

        </Flex>
        {cityCard.map((city, idx) => (
          <PlaylistCard data={city} key={idx} createBtn />
        ))}
      </Flex>
    </>
  )
}

export default Home
