import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Stack,
    Heading,
    Text,
    Box,
    StackDivider,
    Input,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    FormLabel,
    Select,
    useToast,
    Spinner,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { loginUser, signUpUser } from '../../Config/Firebase/firebaseMethod';
import { useNavigate, } from 'react-router-dom';

const Login = () => {

    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();

    // Toast
    const toast = useToast();

    // Navigation
    const navigate = useNavigate();

    // Input (Password) SignUp
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    // Input (Password) LogIn
    const [showw, setShoww] = React.useState(false);
    const handleClickLogIn = () => setShoww(!showw);

    // Signup
    const [signUpInputModal, setSignUpInputModal] = useState({});
    const [signUpLoader, setSignUpLoader] = useState(false);

    const signUp = () => {
        // console.log(signUpInputModal);
        setSignUpLoader(true)
        if (signUpInputModal.password == signUpInputModal.confirmPass) {
            // console.log(signUpInputModal.password, signUpInputModal.confirmPass)
            if (Object.values(signUpInputModal).length >= 6) {
                signUpUser(signUpInputModal)
                    .then((success) => {
                        console.log(success);
                        setSignUpLoader(false)
                        onClose();
                        setSignUpInputModal({});
                        toast({
                            title: success,
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                            position: 'top'
                        })
                    })
                    .catch((err) => {
                        // console.log(err);
                        toast({
                            title: err,
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                            position: 'bottom-left'
                        })
                        setSignUpLoader(false)
                    })
            } else {
                toast({
                    title: "Must fill all input fields.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'bottom-left'
                })
                setSignUpLoader(false)
            }
        } else {
            toast({
                title: "Password did not match.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-left'
            })
            setSignUpLoader(false)
        }
    }

    // Login
    const [logInInputModal, setLogInInputModal] = useState({});
    const [logInLoader, setLogInLoader] = useState(false);

    const login = () => {
        // console.log(logInInputModal);
        setLogInLoader(true)
        if (Object.values(logInInputModal).length >= 2) {
            loginUser(logInInputModal)
                .then((success) => {
                    // console.log(success);
                    toast({
                        title: 'Signed in successfully',
                        status: 'success',
                        duration: 1000,
                        isClosable: true,
                        position: 'top'
                    })
                    setLogInLoader(false)
                    setLogInInputModal({});
                    navigate('/admin/answers', {
                        state: success
                    }
                    )
                })
                .catch((err) => {
                    // console.log(err);
                    toast({
                        title: err.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: 'bottom-left'
                    })
                    setLogInLoader(false)
                })
        } else {
            toast({
                title: "Please enter email & password.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-left'
            })
            setLogInLoader(false)
        }
    }

    return (
        <>

            {/*  Login Card */}
            <Card className='loginCard' sx={{ backgroundColor: '', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CardHeader>
                    <Heading size='md'>Login</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Email Address
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                <Input onChange={(e) => { setLogInInputModal({ ...logInInputModal, email: e.target.value }) }} placeholder='abc@example.com' />
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Password
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={showw ? 'text' : 'password'}
                                        placeholder='********'
                                        onChange={(e) => { setLogInInputModal({ ...logInInputModal, password: e.target.value }) }}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' colorScheme='black' size='sm' onClick={handleClickLogIn}>
                                            {showw ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Text>
                        </Box>
                        <Box>
                            <Text pt='2' fontSize='sm' className='d-flex'>
                                If you have'nt create your account yet, &nbsp; <Text color='teal' cursor='pointer' onClick={onOpen}> Create Account Now.</Text>
                            </Text>
                            {
                                logInLoader
                                    ?
                                    (
                                        <center>
                                            <Spinner
                                                thickness='4px'
                                                speed='0.65s'
                                                emptyColor='gray.200'
                                                color='teal.500'
                                                size='lg'
                                            />
                                        </center>
                                    )
                                    :
                                    (
                                        <Button colorScheme='teal' onClick={() => login()} size='md' width='100%'>
                                            Login
                                        </Button>
                                    )
                            }
                        </Box>
                    </Stack>
                </CardBody>
            </Card>

            {/* Drawer - Signup */}
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent color='black'>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Create a new account
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='username'>First Name</FormLabel>
                                <Input
                                    ref={firstField}
                                    placeholder='Please enter first name'
                                    onChange={e => setSignUpInputModal({ ...signUpInputModal, firstName: e.target.value })}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='username'>Last Name</FormLabel>
                                <Input
                                    placeholder='Please enter last name'
                                    onChange={e => setSignUpInputModal({ ...signUpInputModal, lastName: e.target.value })}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='username'>Email Address</FormLabel>
                                <Input
                                    placeholder='Please enter email address'
                                    onChange={e => setSignUpInputModal({ ...signUpInputModal, email: e.target.value })}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='username'>Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        onChange={e => setSignUpInputModal({ ...signUpInputModal, password: e.target.value })}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='username'>Confirm Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        onChange={e => setSignUpInputModal({ ...signUpInputModal, confirmPass: e.target.value })}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='owner'>Select Gender</FormLabel>
                                <Select
                                    defaultValue='segun'
                                    onChange={e => setSignUpInputModal({ ...signUpInputModal, gender: e.target.value })}
                                >
                                    <option value=''>Select Your Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='custom'>Custom</option>
                                </Select>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        {
                            signUpLoader
                                ?
                                (
                                    <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='teal.500'
                                        size='lg'
                                    />
                                )
                                :
                                (
                                    <Button colorScheme='teal' onClick={() => signUp()}>Submit</Button>
                                )
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >

        </>
    )
}

export default Login;