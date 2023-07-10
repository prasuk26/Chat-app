import { Box, Button, Input, Container, VStack, HStack } from '@chakra-ui/react'
import Message from './Components/Message';
function App() {
  return (
    <Box bg={"pink"}>
      <Container h={"100vh"} bg={"white"}>

        <VStack h={"full"} paddingY={"4"} >

          <Button w={"full"}  colorScheme={"red"}> Logout</Button>

          <VStack w={"full"} h={"full"} >
            <Message text={"Sample message"}/>
            <Message text={"Sample message"} user={"me"}/>
            <Message text={"Sample message"}/>
          </VStack>

          <form style={{ width: "100%" }}>
            <HStack>
              <Input placeholder='Enter a message' />
              <Button colorScheme={"purple"} type='Submit'>Send</Button>
            </HStack>
          </form>



        </VStack>

      </Container>
    </Box>

  );
}

export default App;
