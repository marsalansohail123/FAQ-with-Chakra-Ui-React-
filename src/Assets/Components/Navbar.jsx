import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';

import { writeQuesInDb } from '../../Config/Firebase/firebaseMethod';

function UserScreenNavbar() {

    // Modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    // Input
    const [inputModal, setInputModal] = useState({})

    // Toast
    const toast = useToast()

    const abc = () => {
        if (Object.values(inputModal).length >= 2) {
            // console.log(inputModal)
            writeQuesInDb(inputModal)
                .then((success) => {
                    console.log(success);
                    toast({
                        title: 'Question Added',
                        description: "Thanks for adding your question, We'll respond you soon.",
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                    });
                    setInputModal({});
                })
                .catch((err) => {
                    toast({
                        title: err,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });
            onClose();
        } else {
            toast({
                title: 'Must Fill All The Fields.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            {/* Navbar */}
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand className='navHeading'>QUESTIONS - ANSWERS</Navbar.Brand>
                    <Nav className="ms-auto" variant='pills'>
                        <Button onClick={onOpen} colorScheme='teal' size='md'>
                            Add Your Question
                        </Button>
                    </Nav>
                </Container>
            </Navbar>
            {/* Modal */}
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent className='text-black'>
                    <ModalHeader>Ask your question</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input onChange={(e) => { setInputModal({ ...inputModal, firstName: e.target.value }) }} ref={initialRef} placeholder='Abc' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Your Question</FormLabel>
                            <Input onChange={(e) => { setInputModal({ ...inputModal, question: e.target.value }) }} placeholder='Question....' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => { abc() }} colorScheme='teal' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserScreenNavbar;