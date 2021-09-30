import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Text, Button } from '@chakra-ui/react'
import BasicModal from '../components/BasicModal'
import { useExampleContext } from '../contexts/ExampleContext'

const Home: NextPage = () => {
  const { isOn, toggleExample } = useExampleContext()

  return (
    <div>
      <Head>
        <title>Chakra-UI NextJS Template</title>
        <meta name="description" content="Chakra-UI NextJS Typescript Template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction='column' align='center' justify='center'>
        <Text fontSize='5xl' textAlign='center'>NextJS, Chakra-UI, Typescript Template!< br /> Enjoy!</Text>
        <BasicModal />
        <Button onClick={() => toggleExample(isOn)} m='4'>
          <Text>useContext example is {isOn ? 'On' : 'Off'}</Text>
        </Button>
      </Flex>

    </div>
  )
}

export default Home
