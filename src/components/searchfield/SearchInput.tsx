import React, { ReactElement, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import * as mapApi from 'lib/mapApi';
import useSearch from 'hooks/useSearch';


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
    setSearchResult: (arg1: Object[]) => void;
}

export default function SearchInput({ id, setSearchResult }: Props): ReactElement {
    const classes = useStyles();
    // const { onSearch } = useSearch(); // redux 사용

    const handleKeyDown = async (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // onSearch(e.target.value); // redux 사용
            const result = await mapApi.getSearchResult(e.target.value);
            setSearchResult(result.features);
        }
    }

    const handleClick = () => {
        alert('hello');
    }

    return (
        <Paper id={id} component="form" className={classes.root} onKeyDown={handleKeyDown}>
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