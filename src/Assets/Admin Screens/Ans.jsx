import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminScreenNavbar from '../Components/AdminNavbar';
import {
    Heading,
    Highlight,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Text,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    FormControl,
    FormLabel,
    useToast,
} from '@chakra-ui/react'
import { deleteFromDb, getDataFromDb, updateData } from '../../Config/Firebase/firebaseMethod';

const Ans = () => {

    // User Data
    const location = useLocation();
    // console.log(location.state)

    // Ques Data State
    const [quesData, setQuesData] = useState([])

    // Read Data
    useEffect(() => {
        getDataFromDb('User Ques')
            .then((res) => {
                // console.log(Object.values(res));
                setQuesData(Object.values(res));
            })
            .catch((err) => console.log(err))
    }, [])
    // console.log(quesData)


    // Toast
    const toast = useToast();

    // Modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    // Edit Answer Input State
    const [editAnsInp, setEditAnsInp] = useState('')
    const [editAnsIndex, setEditAnsIndex] = useState(null);
    const [editAnsFlag, setEditAnsFlag] = useState(false);

    // Edit Answer
    const handleEditPrevAns = (e, i) => {
        // console.log(e, i)
        setEditAnsInp(e.answer);
        setEditAnsIndex(i);
        setEditAnsFlag(true);
        onOpen();
    }

    const editAnswer = () => {
        // console.log(editAnsInp);
        quesData[editAnsIndex].answer = editAnsInp;
        // console.log(quesData[editAnsIndex])
        updateData(quesData[editAnsIndex]);
        setEditAnsFlag(false);
        onClose();
        toast({
            title: 'Answer Updated Successfully',
            status: 'success',
            isClosable: true,
        })
    }

    // Add Answer States
    const [addAnsIndex, setAddAnsIndex] = useState(null);

    const handleAddAns = (data, index) => {
        setAddAnsIndex(index)
        onOpen();
    }
    // console.log(addAnsIndex);

    const addAnswer = () => {
        const answer = { ...quesData[addAnsIndex], answer: editAnsInp };
        // quesData[addAnsIndex] = answer;
        // console.log(quesData[addAnsIndex])
        // console.log(answer);
        updateData(answer);
        onClose();
        setEditAnsInp('');
        toast({
            title: 'Answer Added Successfully',
            description: 'Refresh / Re-load the page to see the changes.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        // console.log(addAnsIndex);
    }

    // Cancel Modal
    const closeModal = () => {
        setEditAnsFlag(false);
        setEditAnsInp('');
        onClose();
    }

    // Delete
    const deleteQues = (data) => {
        deleteFromDb(`User Ques/${data.id}`)
        toast({
            title: 'Question Deleted Successfully',
            description: 'Refresh / Re-load the page to see the changes.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }
    return (
        <>
            {/* Navbar */}
            <AdminScreenNavbar />

            {/* Heading */}
            <Heading lineHeight='tall' sx={{ my: '3', mx: '3' }} className="text-center">
                <Highlight
                    query={['Question', 'Answer']}
                    styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.600', }}
                >
                    Question / Answer
                </Highlight>
            </Heading>

            {/* Questions */}
            {quesData.map((e, i) => {
                return (
                    <>
                        <Card align='center' key={i} className='m-1 mb-1 border' backgroundColor='#f0fcf3'>
                            <CardBody>
                                <CardHeader className='text-center'>
                                    <Heading size='md'>Name: {e.firstName}</Heading>
                                </CardHeader>
                                <Text>Question {i + 1}: {e.question}</Text>
                                <Text>Answer: {e.answer || "Waiting for answer"} &nbsp;
                                    {
                                        e.answer
                                            ?
                                            <Button size='sm' onClick={() => handleEditPrevAns(e, i)} colorScheme='green'>Edit Answer</Button>
                                            :
                                            <Button size='sm' onClick={() => handleAddAns(e, i)} colorScheme='teal'>Add Answer</Button>
                                    }
                                </Text>
                            </CardBody>
                            <CardFooter sx={{ mx: 3 }}>
                                <Button colorScheme='red' onClick={() => deleteQues(e)}>Delete Question</Button>
                            </CardFooter>
                        </Card>
                    </>
                )
            })}

            {/* Modal */}
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
            // onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent color='black'>
                    <ModalHeader>Add Answer</ModalHeader>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='First name' value={location.state.firstName + " " + location.state.lastName} isDisabled />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Answer</FormLabel>
                            <Input ref={initialRef} placeholder='Answer...' value={editAnsInp} onChange={e => setEditAnsInp(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        {
                            editAnsFlag
                                ?
                                <Button colorScheme='blue' mr={3} onClick={() => editAnswer()}>
                                    Save
                                </Button>
                                :
                                <Button colorScheme='blue' mr={3} onClick={() => addAnswer()}>
                                    Add
                                </Button>
                        }
                        <Button onClick={() => closeModal()}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Ans;