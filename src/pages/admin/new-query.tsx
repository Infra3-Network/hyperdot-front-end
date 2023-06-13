import {
  Box, SimpleGrid, Flex,
  ListItem,
  Button,
  Grid,
  GridItem,
  Input, IconButton, Select, Alert, AlertIcon, Link, UnorderedList
} from '@chakra-ui/react'
import { BiSearch, BiFullscreen, BiCollapse, BiCodeAlt } from 'react-icons/bi';
import { AiOutlineTable } from 'react-icons/ai';

import {
  polkadotBlockColumns,

} from 'views/admin/newQuery/variables/polkadotColumnData';

import DevelopTextEditor from 'views/admin/newQuery/components/DevelopTextEditor';
import PolkadotBlockTable from 'views/admin/newQuery/components/PolkadotBlockTable';
import polkadotData from 'views/admin/newQuery/variables/polkadotData.json';
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import CheckTable from 'views/admin/dataTables/components/CheckTable'
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable'
import ComplexTable from 'views/admin/dataTables/components/ComplexTable'
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex
} from 'views/admin/dataTables/variables/columnsData'
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment.json'
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck.json'
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns.json'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex.json'
import React from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import dynamic from 'next/dynamic'

export default function NewQuery() {
  const Ace = dynamic(
    () => import("components/editor/Editor"),
    { ssr: false }
  )

  return (
    <AdminLayout>
      <Flex height="100vh" pt={{ base: '130px', md: '80px', xl: '80px' }}>
        {/* <Box pt={{ base: '130px', md: '80px', xl: '80px' }}> */}
        {/* <SimpleGrid
          mb='20px'
          columns={{ sm: 0, md: 2 }}
          spacing={{ base: '10px', xl: '10px' }}
        > */}

        {/* 第一列 */}
        <Box width="20%" height="100%">
          <Flex direction="column" height="100%">
            {/* 第一部分 */}
            <Flex direction="column" p="4">
              <Select placeholder="选择框" mb="4" />
              <Alert status="info">
                <AlertIcon />
                这是一个信息提示框
              </Alert>
            </Flex>
            {/* 第二部分 */}
            <Flex direction="column" p="4">
              {/* 第一个 Flex */}
              <Flex align="center" mb="4">
                <Link href="#">链接</Link>
                <Select ml="4" placeholder="选择不同的chain" />
              </Flex>
              {/* 第二个 Flex */}
              <Flex direction="column">
                <UnorderedList>
                  <ListItem>
                    <Flex align="center">
                      <Link href="#">chain名称</Link>
                      <Box ml="2">数据图标</Box>
                      <Button ml="2" size="sm" variant="ghost">按钮图标</Button>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex align="center">
                      <Link href="#">chain名称</Link>
                      <Box ml="2">数据图标</Box>
                      <Button ml="2" size="sm" variant="ghost">按钮图标</Button>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex align="center">
                      <Link href="#">chain名称</Link>
                      <Box ml="2">数据图标</Box>
                      <Button ml="2" size="sm" variant="ghost">按钮图标</Button>
                    </Flex>
                  </ListItem>
                </UnorderedList>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Box
          width="80%"
          height="100%"
        >

          <Flex
            // height="40%"
            direction="column"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >

            <Ace
              placeholder="Placeholder Text"
              mode="mysql"
              theme="monokai"
              name="blah2"
              //   onLoad={this.onLoad}
              //   onChange={this.onChange}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              //   value={`select * from hyperdot;`}
              width="100%"
              // height="200px"
              // commands={beautify.commands}

              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />

          </Flex>

          {/* <Box mt="5"> */}
          <Flex
            mt="5"
            direction="column"
          >
            {/* <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={(tableDataDevelopment as unknown) as TableData[]}
            /> */}
            <PolkadotBlockTable
              columnsData={polkadotBlockColumns}
              tableData={polkadotData}
            />
            {/* </Box> */}
          </Flex>

        </Box>

        {/* <DevelopTextEditor /> */}
        {/* <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={(tableDataDevelopment as unknown) as TableData[]}
            /> */}
        {/* <CheckTable
              columnsData={columnsDataCheck}
              tableData={(tableDataCheck as unknown) as TableData[]}
            /> */}
        {/* <ColumnsTable
              columnsData={columnsDataColumns}
              tableData={(tableDataColumns as unknown) as TableData[]}
            />
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={(tableDataComplex as unknown) as TableData[]}
            /> */}
        {/* </SimpleGrid> */}
        {/* </Box> */}
      </Flex>
    </AdminLayout>
  )
}
