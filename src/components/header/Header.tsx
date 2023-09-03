import {
    Box, Flex, Menu, MenuButton, MenuList,
    Button,
    MenuItem,
    IconButton,
    Icon, Text
} from "@chakra-ui/react"
import {
    HamburgerIcon,
    AddIcon,
    ExternalLinkIcon,
    RepeatIcon,
    EditIcon,
    SmallAddIcon,
    ChevronDownIcon,
} from '@chakra-ui/icons'

import {
    MdTerminal
} from 'react-icons/md'


function Header() {
    return (
        <Box
            maxW='100%'
            minW='100%'
            maxH='10%'
            minH='%10'
            overflow='hidden'
            h='60px'
            bg='white'
            position='fixed'
            top={0}
            left={0}
            right={0}
            zIndex={1}
            shadow={'md'}
        >
            <Flex
                position='fixed'
                left={0}
                right={0}
                top={0}
                zIndex={1}
            >
                <Box>
                    <Button
                        size={'sm'}
                        borderRadius={'4px'}
                        p={2}
                        m={3}
                    >
                        Placeholder
                    </Button>
                </Box>
                {/* Creations Button */}
                <Box
                    mt={3}
                    mb={3}

                    // minWidth={'max-content'}
                >
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Menu>
                        <MenuButton
                            as={Button}
                            size={'sm'}
                            // no radious
                            borderRadius={'4px'}
                            leftIcon={<SmallAddIcon/>}
                        >
                            Creations
                        </MenuButton>
                        <MenuList
                        >
                            <MenuItem
                                icon={<Icon as={MdTerminal} w={5} h={5}/>}
                                command='⌘T'
                            >
                                New Query
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
        </Box>
    )
}

export default Header