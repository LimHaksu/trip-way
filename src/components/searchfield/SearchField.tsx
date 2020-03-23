import React, { ReactElement, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '30vw',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

interface Props {
    id?: string;
}

const handleClick = () => {
    alert('hello');
}

export default function SearchField({ id }: Props): ReactElement {
    const classes = useStyles();
    return (
        <Paper id={id} component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="장소를 입력하세요."
                inputProps={{ 'aria-label': 'search place' }}
            />
            <IconButton type="button" className={classes.iconButton} aria-label="search" onClick={handleClick}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}