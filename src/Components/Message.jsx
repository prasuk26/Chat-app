import React from 'react'
import {HStack , Avatar, Text} from '@chakra-ui/react'
function Message({text,uri,user="other"})  {
  return (
    
        <HStack alignSelf={user==="me"?"flex-end":"flex-start"} paddingX={user==="me" ? "4" : "2"} paddingY={"2"} bg={"grey.100"} borderRadius={"base"} >
            {
                user === "other" && <Avatar src={uri}/>
            }
            <Text>{text}</Text>
            {
                user === "me" && <Avatar src={uri}/>
            }
        </HStack>
    
  )
}

export default Message