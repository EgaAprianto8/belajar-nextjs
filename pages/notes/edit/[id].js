import dynamic from "next/dynamic";
import {
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Spinner,
  Flex
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function AddNotes() {
  const router = useRouter();
  const { id } = router.query;
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const HandleSubmit = async () => {

    console.log('notes => ', notes)
    setSubmitLoading(true);
    try {

      //saya ada error status 500, saya bingung karena output pada live session dan saya berbeda, padahal sudah saya sesuaikan 🙏

      const response = await fetch (`http://localhost:3000/api/notes/update/${id}`, {
          method: "PATCH",
          body: JSON.stringify(notes),
        });
      const result = await response.json();
      if (result?.success) {
        setSubmitLoading(false);
        router.push("/notes");
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData(notesId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/notes/${notesId}`
        );
        const detailNotes = await response.json();
        setNotes({ 
          title: detailNotes?.data?.title,
          description: detailNotes?.data?.description,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    if (id) fetchingData(id);
  }, [id]);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {isLoading ? (
          <Flex 
          justifyContent="center"
          alignItems="center"
          height="60vh" >
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Card margin="5" padding="5">
            <Heading>Edit Notes</Heading>
            <Grid gap="5">
              <GridItem>
                <Text>Title</Text>
                <Input
                  value={notes?.title}
                  type="text"
                  onChange={(event) =>
                    setNotes({ ...notes, title: event.target.value })
                  }
                />
              </GridItem>
              <GridItem>
                <Text>Description</Text>
                <Textarea
                  value={notes?.description}
                  onChange={(event) =>
                    setNotes({ ...notes, description: event.target.value })
                  }
                />
              </GridItem>
              <GridItem>
                <Button isLoading={submitLoading} onClick={() => HandleSubmit()} colorScheme="blue">
                  Submit
                </Button>
              </GridItem>
            </Grid>
          </Card>
        )}
      </LayoutComponent>
    </>
  );
}
