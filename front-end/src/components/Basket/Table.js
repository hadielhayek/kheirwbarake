import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, styled, useTheme } from '@mui/material';



export default function BasicTable({ data }) {

    const theme = useTheme()

    const styledPaper = styled(Paper)({

        backgroundColor: theme.palette.secondary.main,
    }
    )

    return (
        <Container>
            <TableContainer component={styledPaper} sx={{ color: "#000" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell align="left">نوع الصنف</TableCell>
                            <TableCell align="left">الوزن</TableCell>
                            <TableCell align="left">العدد</TableCell>
                            <TableCell align="left">السعر الافرادي</TableCell>
                            <TableCell align="left">السعر الاجمالي</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ height: '50vh', backgroundColor: '#FFFF' }}>
                        {data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:nth-child(even)': {
                                        backgroundColor: theme.palette.grey[200]
                                    }, '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >

                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.weight}</TableCell>
                                <TableCell align="left">{row.quantity}</TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 700 }}>{row.price * row.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
