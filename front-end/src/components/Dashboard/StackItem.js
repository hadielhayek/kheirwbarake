import styled from '@emotion/styled';
import { Grid, IconButton, Paper, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import { green, grey, red } from '@mui/material/colors';
import { useTheme } from '@emotion/react';


/**
 *  Custom made MUI Component that will return a stack item and show data from the passed props
 * @param {object} data - data to show in the stack item
 * @param {function} setDelete - function to call when the delete button is clicked with id, 
 * post type, and post title
 * @param {string} id - post id to be used in the CRUD functions
 * @param {string} type - post type to be used in teh CRUD functions
 * @returns {MUI custom item list component }
 */function StackItem({ data, setDelete, type, setUpdate }) {


    const theme = useTheme()

    //create an Item element made from MUI paper 
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        display: 'flex',
        height: 'fit-content',
        columnGap: theme.spacing(4),

        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme.palette.text.primary,
        transition: '200ms',
        "&:hover": {
            backgroundColor: grey[400],
        }
    }));


    // set button color on hover
    const hoverColor = (color) => {
        return {
            '&:hover': { color: color }, transition: '300ms'
        }
    }

    // handle delete item
    const handleDelete = () => {
        setDelete({ isOpen: true, id: data._id, type: type, title: data.title })
    }

    // handle Update item
    const handleUpdate = () => {
        setUpdate({ isOpen: true, data: { ...data } })
    }

    const imageLinkHandler = () => {
        if (data.image) return ('http://localhost:5000/public/uploads/' + data.image)
        return 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
    }

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    return (
        <>
            <Item>

                <Box
                    sx={{
                        minHeight: '100%',
                        height: "80px",
                        width: '100px',
                        overflow: 'hidden',
                        borderRight: ` 2px solid ${theme.palette.primary.main}`,
                    }}
                >
                    <Box
                        component='img'
                        display={'block'}
                        alt='thumbnail'
                        sx={{
                            display: 'block',
                            height: '100%',
                            width: '100%',
                            borderRadius: '4px 0 0 4px ',

                            objectFit: 'cover',


                        }}
                        src={imageLinkHandler()}

                    />
                </Box>
                <Grid
                    container
                    spacing={theme.spacing(1)}
                    alignItems={'center'}
                    overflow='hidden'
                    padding={theme.spacing(1)}
                >
                    <Grid
                        item
                        xs={12}
                        md={3}
                        overflow='hidden'

                    >
                        <Typography variant="h6" noWrap>
                            {data.title}
                        </Typography>
                    </Grid>


                    <Grid
                        item
                        md
                        xs={12}
                        overflow='hidden'
                    >
                        <Typography noWrap >
                            {data.body}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        md={2}
                        xs={12}
                        display='flex'
                        justifyContent='flex-end'
                        overflow='hidden'
                    >
                        <IconButton sx={hoverColor(green[900])} onClick={handleUpdate} >
                            <EditIcon />
                        </IconButton>

                        <IconButton sx={hoverColor(red[900])} onClick={handleDelete} >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Item>
        </>
    )
}

export default StackItem
