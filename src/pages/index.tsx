import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Text, Button, Image, Select, Input, HStack, Box, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import BasicModal from '../components/BasicModal'
import { useExampleContext } from '../contexts/ExampleContext'
import { useEffect, useState } from 'react'
import { getWeather } from '../services/weatherApi'
import { getPlaylist } from '../services/deezerApi'

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
  const { isOn, toggleExample } = useExampleContext();
  const [cityName, setCityName] = useState('');
  const [cityCard, setCityCard] = useState<CityProps[]>([])


  console.log(cityCard)
  return (
    <>
      <Head>
        <title>Desafio React Mesha</title>
        <meta name="description" content="Desafio React para vaga na Mesha Tecnologia" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Button onClick={async () => console.log(getPlaylist("Rock"))}>
        Aqui
      </Button>
      <Flex direction='column' align='center' justify='center' p='8'>
        <Text fontSize='5xl' textAlign='center'>
          Find the best playlist here!
        </Text>


        <Flex >
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
            {/* <Select
              value={cityName}
              onChange={e => setCityName(e.target.value)}
              _hover={{
                bg: 'gray.100',
              }}
              _focus={{
                bg: 'white',
              }}
              bg='white'
              placeholder="Select your city"
              size='lg'
              variant='filled'
              h='14'
              w='md'
            >
              <option value="London">London</option>
              <option value="Brooklyn">Brooklyn</option>
              <option value="New York">New York</option>
              <option value="Oklahoma">Oklahoma</option>
            </Select> */}

            <Button
              onClick={async () => {
                const cityData = await getWeather(cityName)
                const playlist = await getPlaylist(cityData.genre)
                await setCityCard([...cityCard,
                {
                  name: cityData.name,
                  temp: cityData.temp,
                  genre: cityData.genre,
                  playlist: playlist
                }])
              }}
              h='14'
              bg='white'
              _hover={{ bg: 'gray.100' }}>
              <Text> Search your playlist!</Text>
            </Button>
          </HStack>
        </Flex>
        {cityCard.map((city, idx) => {

          return (
            <Flex
              key={idx}
              width='700px'
              height='300px'
              background='gray.600'
              m='10'
            >
              <Flex
                direction='column'
                p='8'
                fontSize='3xl'
                color='blue.200'
                justify='space-between'

              >
                <Box>
                  <Text>{city.temp} ºC</Text>
                  <Text>{city.name}</Text>
                </Box>
                <Text>The genre for this temp is: {city.genre}
                </Text>
              </Flex>

              <Box
                bg='blue.900'
                color='whiteAlpha.800'
                overflowY='scroll'
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                    background: '#fff'
                  }
                }}
              >

                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th color='whiteAlpha.700'>Music</Th>
                      <Th color='whiteAlpha.700'>Album</Th>
                      <Th color='whiteAlpha.700'>Album</Th>

                    </Tr>
                  </Thead>
                  <Tbody>
                    {city.playlist.tracks.map(track => (
                      <Tr key={track.key}>
                        <Td><Image src={track.images.coverart} alt={track.title} /></Td>
                        <Td>{track.title}</Td>
                        <Td>{track.subtitle}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Flex>
          )
        })}
      </Flex>

    </>
  )
}

export default Home
