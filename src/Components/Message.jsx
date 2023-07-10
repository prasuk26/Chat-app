import React from 'react'
import {HStack , Avatar, Text} from '@chakra-ui/react'
function Message({text,uri,user="other"})  {
  return (
    
        <HStack alignSelf={user==="me"?"flex-end":"flex-start"} paddingX={"4"} paddingY={"2"} bg={"grey.100"} borderRadius={"base"} >
            <Text>{text}</Text>
            <Avatar src={uri}/>
        </HStack>
    
  )
}

export default Message