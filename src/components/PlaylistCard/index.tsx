import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Flex, Text, Button, Image, Select, Input, HStack, Box, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { usePlaylist } from '../../contexts/PlaylistContext';

interface CityProps {
  name: string;
  temp: number;
  genre: string;
  playlist?: PlaylistProps
  createdAt?: string;
  id?: string;
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

interface PlaylistCardProps {
  data: CityProps;
  createBtn?: boolean;
  deleteBtn?: boolean;
}


export function PlaylistCard({ data, createBtn, deleteBtn }: PlaylistCardProps) {

  const { savePlaylist, removePlaylist } = usePlaylist();

  async function createPlaylist(playlist: CityProps) {
    await savePlaylist(data);
  }


  return (
    <Flex
      width='700px'
      height='300px'
      background='gray.600'
      m='10'
      borderRadius='8'
    >
      {createBtn && <Button onClick={async () => createPlaylist(data)}><AddIcon /></Button>
      }
      {deleteBtn && <Button onClick={async () => removePlaylist(data.id)}><DeleteIcon /></Button>
      }

      <Flex
        direction='column'
        p='8'
        color='blue.200'
        justify='space-between'

      >
        <Box fontSize='2xl'>
          <Text>{data.temp} ºC</Text>
          <Text>{data.name}</Text>
        </Box>
        <Text>The genre for this temp is:
        </Text>
        <Text color='teal.100' fontSize='3xl'>{data.genre}</Text>
        {data.createdAt && <Text fontSize='sm'> Created at: {data.createdAt}</Text>}

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
              <Th color='whiteAlpha.700'>Artist</Th>

            </Tr>
          </Thead>
          <Tbody>
            {data.playlist.tracks.map(track => (
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
}