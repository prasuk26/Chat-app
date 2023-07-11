import {
  Box,
  Button,
  Input,
  Container,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Message from "./Components/Message";
import { getAuth, GoogleAuthProvider, signInWithPopup , onAuthStateChanged} from "firebase/auth";
import { app } from "./firebaseConfig";
import { useEffect, useState } from "react";

const auth = getAuth(app);
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

function App() {
  const [user, setUser] = useState(false);

  useEffect( () => {
    onAuthStateChanged(auth, (data) => {
      setUser(data);
    })
  })
  
  return (
    <Box bg={"pink"}>
      {user? (
      <Container h={"100vh"} bg={"white"}>
        <VStack h={"full"} paddingY={"4"}>
          <Button w={"full"} colorScheme={"red"}>
            {" "}
            Logout
          </Button>

          <VStack w={"full"} h={"full"} overflowY={"auto"}>
            <Message text={"Sample message"} />
            <Message text={"Sample message"} user={"me"} />
          </VStack>

          <form style={{ width: "100%" }}>
            <HStack>
              <Input placeholder="Enter a message" />
              <Button colorScheme={"purple"} type="Submit">
                Send
              </Button>
            </HStack>
          </form>
        </VStack>
      </Container>
      ) :
      <VStack bg={"white"} justifyContent={"center"}  h={"100vh"}>
        <Button onClick={loginHandler} colorScheme="purple">Sign in With Google</Button>
      </VStack>}
    </Box>
  );
}

export default App;
