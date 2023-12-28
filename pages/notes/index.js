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
 Spinner
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Axios from "axios";

   
const LayoutComponent = dynamic(() => import("@/layouts"));
   
export default function Notes() {
 const router = useRouter();
 const [notes, setNotes] = useState();  
 const [isLoading, setIsLoading] = useState(true);
 const [isError, setError] = useState(false)

 const handleDelete = async (id) =>{
  try {
   const response = await fetch(
    `http://localhost:3000/api/notes/delete/${id}`,
    {
     method: "POST",
    }
   );
   const result = await response.json();
   if (result?.success) {
    router.reload()
   }
  } catch (error) {}
 }
   
 useEffect(() => {
  async function fetchingData() {
    //Saya coba memperbaiki code nya dengan mengikuti Live Session pertemuan 13
   try {
    const response = await Axios.get(`http://localhost:3000/api/notes`);
    setNotes(response?.data);
    setIsLoading(false)
   } catch (error) {
    setIsLoading(false)
    setError(true)
  }
  }
  fetchingData();
 }, []);  
   console.log("notes => ", notes)
 return (
 <>
  <LayoutComponent metaTitle="Notes">
   <Box padding="5" align = "end">
     <Button
      colorScheme="blue"
      onClick={() => router.push("/notes/add")}
     >
      Add Notes
     </Button>
    <Flex justifyContent="center" p={4}>
       {isLoading && !isError ? (
          <Flex 
          justifyContent="center"
          alignItems="center"
          height="60vh" >
            <Spinner size="xl" />
          </Flex>
        ) : ( 
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
           onClick={()=> handleDelete(item.id)}
          >
           Delete
          </Button>
         </CardFooter>
        </Card>
       </GridItem>
      ))}
     </Grid>
    </Flex>
        )}
        {isError && (
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        )}
    </Flex>
   </Box>
  </LayoutComponent>
 </>
);
}