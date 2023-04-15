import React, { useEffect, useState } from 'react'

import UserScreenNavbar from '../Components/Navbar';

import {
    Highlight,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Stack,
    Skeleton,
} from '@chakra-ui/react';

import { getDataFromDb } from '../../Config/Firebase/firebaseMethod';

const Ques = () => {

    const [quesData, setQuesData] = useState([])
    const [isLoader, setIsLoader] = useState(true)

    useEffect(() => {
        getDataFromDb('User Ques')
            .then((res) => {
                setIsLoader(false)
                setQuesData(Object.values(res));
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log(quesData)

    return (
        <>
            {/* Navbr */}
            <UserScreenNavbar />
            {/* Heading */}
            <Heading lineHeight='tall' sx={{ my: '3', mx: '3' }}>
                <Highlight
                    query={['questions', 'answered']}
                    styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.600' }}
                >
                    Here is the some islamic questions which have been answered by verified scholars.
                </Highlight>
            </Heading>
            {isLoader
                ?
                /* Loader */
                (
                    <Stack sx={{ mx: '3', my: '3' }}>
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                    </Stack>
                )
                :
                /* Ques - Ans */
                (
                    <Box sx={{ mx: '3', my: '3' }}>
                        <Accordion defaultIndex={[0]} allowMultiple>
                            {quesData.map((e, index) => {
                                return (
                                    <AccordionItem key={index}>
                                        <>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        Question {index + 1}: {e.question}
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                Answer: {e.answer || "The answer is not currently available."}
                                            </AccordionPanel>
                                        </>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </Box>
                )
            }
        </>
    );
}

export default Ques;