import {
  Box,
  Button,
  Input,
  Container,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Message from "./Components/Message";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,orderBy
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import { useEffect, useRef, useState } from "react";

const auth = getAuth(app);
const db = getFirestore(app);
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
const logoutHandler = () => {
  signOut(auth);
};

function App() {
  const q = query(collection(db,"Messages"),orderBy("createdAt","asc"));
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      setMessage("");


      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      divForScroll.current.scrollIntoView({behavior: "smooth"})
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

  //  const unsubscribeForMessage =  onSnapshot(collection(db, "Messages"), (snap) => {
  const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });
    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);

  return (
    <Box bg={"pink"}>
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h={"full"} paddingY={"4"}>
            <Button w={"full"} colorScheme={"red"} onClick={logoutHandler}>
              Logout
            </Button>

            <VStack w={"full"} h={"full"} overflowY={"auto"}>
              {/* <Message text={"Sample message"} />
              <Message text={"Sample message"} user={"me"} /> */}

              {messages.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  uri={item.uri}
                />
              ))}

            <div ref={divForScroll}></div>
            </VStack>


            <form style={{ width: "100%" }} onSubmit={submitHandler}>
              <HStack>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter a message"
                />
                <Button colorScheme={"purple"} type="Submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack bg={"white"} justifyContent={"center"} h={"100vh"}>
          <Button onClick={loginHandler} colorScheme="purple">
            Sign in With Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;