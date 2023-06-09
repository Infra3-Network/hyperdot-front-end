import { Box, SimpleGrid, Flex, Input, IconButton, Select } from '@chakra-ui/react'
import { BiSearch, BiFullscreen, BiCollapse, BiCodeAlt } from 'react-icons/bi';
import { AiOutlineTable } from 'react-icons/ai';


import DevelopTextEditor from 'views/admin/newQuery/components/DevelopTextEditor';

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

export default function NewQuery() {
    return (
        <AdminLayout>
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
          <SimpleGrid
            mb='20px'
            columns={{ sm: 0, md: 2 }}
            spacing={{ base: '10px', xl: '10px' }}
          >
            <DevelopTextEditor/>
            {/* <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={(tableDataDevelopment as unknown) as TableData[]}
            /> */}
            <CheckTable
              columnsData={columnsDataCheck}
              tableData={(tableDataCheck as unknown) as TableData[]}
            />
            {/* <ColumnsTable
              columnsData={columnsDataColumns}
              tableData={(tableDataColumns as unknown) as TableData[]}
            />
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={(tableDataComplex as unknown) as TableData[]}
            /> */}
          </SimpleGrid>
        </Box>
      </AdminLayout>
    )
}
