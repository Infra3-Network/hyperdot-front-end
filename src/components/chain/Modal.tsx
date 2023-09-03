import {
    Box,
    Button, Flex, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Image
} from "@chakra-ui/react";

import React from "react";


interface Props {
    isOpen: boolean,
    onClose: any,
    relayChains: any,
    chains: any,
}

function ChainModal(props: Props) {
    return (
        <>
            <Modal
                size={'4xl'}
                blockScrollOnMount={false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay/>
                <ModalContent width={'100%'} borderRadius={'0.5rem'}>
                    <ModalHeader alignItems={'center'} padding={'1rem'} borderBottom={'1px solid #e0e0e0'}>Select
                        Chain</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex
                            direction={'column'}
                        >
                            {/* Chain search*/}
                            <Box mt={'15px'} mb={'15px'} ml={'5px'} mr={'5px'}>
                                <Input placeholder='Search chain'/>
                            </Box>

                            {/*Chains*/}
                            {Object.keys(props.relayChains).map(key => (
                                <>
                                    <Box>
                                        <Text fontSize={'xl'} as={'b'}> {props.relayChains[key].name} &
                                            ParaChains</Text>
                                    </Box>
                                    <Flex
                                        direction={'row'}
                                        wrap={'wrap'}
                                    >
                                    {
                                        props.relayChains[key].paraChainIDs.map((id: any) => (
                                                <Button
                                                    display={'flex'}
                                                    alignItems={'center'}
                                                    flexDirection={'column'}
                                                    cursor={'pointer'}
                                                    // borderColor={'#b23cfd'}
                                                    borderColor={props.relayChains[key].showColor}
                                                    borderRadius={'.125rem'}
                                                    border={'solid'}
                                                    verticalAlign={'bottom'}
                                                    fontWeight={'500'}
                                                    fontSize={'.75rem'}
                                                    lineHeight={'1.5'}
                                                    width={'20%'}
                                                    height={'5rem'}
                                                    padding={'3px'}
                                                    ml={'2%'}
                                                    mr={'2%'}
                                                    mt={'3px'}
                                                    mb={'3px'}
                                                    textAlign={'center'}
                                                    variant='outline'
                                                >
                                                    <Image verticalAlign={'middle'} borderRadius={'50%'} width={'24px'}
                                                           src={props.chains[id].iconUrl}/>
                                                    <Text fontSize={'0.85rem'} textAlign={'center'}>{props.chains[id].chainName}</Text>
                                                </Button>
                                        ))
                                    }
                                    </Flex>
                                </>
                            ))}

                        </Flex>

                    </ModalBody>

                    <ModalFooter>
                        {/*<Button colorScheme='blue' mr={3} onClick={props.onClose}>*/}
                        {/*    Close*/}
                        {/*</Button>*/}
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default ChainModal