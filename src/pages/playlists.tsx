import Head from 'next/head'
import { Flex, Text } from '@chakra-ui/react'
import { usePlaylist } from '../contexts/PlaylistContext'
import { PlaylistCard } from '../components/PlaylistCard'





export default function PlaylistPage() {
  const { savePlaylist, playlists } = usePlaylist();

  return (
    <>
      <Head>
        <title>Playlists</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Flex direction='column' align='center' justify='center' p='8'>
        <Text fontSize='5xl' textAlign='center'>
          Your saved playlists
        </Text>

        {playlists.map((playlist, idx) => (
          <PlaylistCard data={playlist} key={idx} deleteBtn />
        ))}

      </Flex>
    </>
  )
}
