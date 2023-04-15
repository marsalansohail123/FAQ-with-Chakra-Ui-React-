import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';

import {
    useDisclosure,
    Popover,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteFromDb } from '../../Config/Firebase/firebaseMethod';

function AdminScreenNavbar() {

    // User Data
    const location = useLocation();
    // console.log(location.state)

    const navigate = useNavigate();

    // User Name
    const firstName = location.state.firstName;
    const lastName = location.state.lastName;
    const updateName = firstName.toUpperCase() + " " + lastName.toUpperCase();

    // Delete Confirmation
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    // Toast
    const toast = useToast();

    // Delete All Ques
    const deleteAllQues = () => {
        // alert("settttyyyyyy")
        deleteFromDb('User Ques')
        onClose();
        navigate('/admin')
        toast({
            title: 'Questions deleted successfully',
            description: 'Login to see the changes',
            status: 'success',
            isClosable: true,
        })
    }

    return (
        <>
            {/* Navbar */}
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand className='navHeading'>WELCOME, {updateName}</Navbar.Brand>
                    <Nav className="ms-auto" variant='pills'>
                        {/* Confirmation Popup */}
                        <Popover
                            returnFocusOnClose={false}
                            isOpen={isOpen}
                            onClose={onClose}
                            placement='right'
                            closeOnBlur={false}
                        >
                            <Button colorScheme='red' onClick={onOpen}>
                                Delete All Questions
                            </Button>

                            <AlertDialog
                                isOpen={isOpen}
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent color='black'>
                                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                            Confirmation
                                        </AlertDialogHeader>

                                        <AlertDialogBody>
                                            Are you sure? You can't undo this action afterwards.
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button ref={cancelRef} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme='red' onClick={() => deleteAllQues()} ml={3}>
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </Popover>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminScreenNavbar;