import dynamic from "next/dynamic";
import {
 Box,
 Flex,
 Grid,
 GridItem,
 Card,
 CardBody,
 CardHeader,
 CardFooter,
 Heading,
 Text,
 Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
   
const LayoutComponent = dynamic(() => import("@/layouts"));
   
export default function Notes() {
 const router = useRouter();
 const [notes, setNotes] = useState();  
   
 useEffect(() => {
  async function fetchingData() {
    //Saya gk ngerti kenapa error nya Unhandled Runtime Error padahal sudah sesuai dengan intruksi pada materi
   const res = await fetch("https://simpeg-be.vercel.app/api/v2/notes");
   const listNotes = await res.json();
   setNotes(listNotes);
  }
  fetchingData();
 }, []);  
   console.log("notes => ", notes)
 return (
 <>
  <LayoutComponent metaTitle="Notes">
   <Box padding="5">
    <Flex justifyContent="end">
     <Button
      colorScheme="blue"
      onClick={() => router.push("/notes/add")}
     >
      Add Notes
     </Button>
    </Flex>
    <Flex>
     <Grid templateColumns="repeat(3, 1fr)" gap={5}>
      {notes?.data?.map((item) => (
       <GridItem key={item.id}>
        <Card>
         <CardHeader>
          <Heading>{item?.title}</Heading>
         </CardHeader>
         <CardBody>
          <Text>{item?.description}</Text>
         </CardBody>
         <CardFooter justify="space-between" flexWrap="wrap">
          <Button
           onClick={() => router.push(`/notes/edit/${item?.id}`)}
           flex="1"
           variant="ghost"
          >
           Edit
          </Button>
          <Button
           flex="1"
           colorScheme="red"
          >
           Delete
          </Button>
         </CardFooter>
        </Card>
       </GridItem>
      ))}
     </Grid>
    </Flex>
   </Box>
  </LayoutComponent>
 </>
);
}