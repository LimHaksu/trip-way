import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Checkbox from '@material-ui/core/Checkbox';
import useSearch from 'hooks/useSearch';
import './tripplacelist.scss';

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

function createData(name: string) {
    return { name };
}

const useStyles2 = makeStyles({
    table: {
        minWidth: '323px',
    },
    tableContainer: {
        padding: '2px 4px',
        width: '30vw',
        minWidth: '323px'
    },
    tableRow: {
        "&$hover:hover": {
            backgroundColor: "blue"
        }
    },
    tableCell: {
        "$hover:hover &": {
            color: "pink"
        }
    },
    hover: {}
});

interface Props {
    id?: string;
    clickedIndex: number;
    setClickedIndex: React.Dispatch<React.SetStateAction<number>>;
    tripPlaceList: Object[];
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function TripPlaceList({ id, clickedIndex, setClickedIndex, tripPlaceList, selected, setSelected }: Props) {
    // const { searchResult } = useSearch(); // redux 적용할때 사용하기
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<{ index: number, name: string }[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // 클릭했을때 선택하는 코드
    const isSelected = (index: number) => selected.indexOf(index) !== -1;
    const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
        const selectedIndex = selected.indexOf(index);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    // 검색결과 바뀌었을때 리스트에 뿌려주는 코드
    const setList = (tripPlaceList: Object[]) => {
        const selectedListNames = tripPlaceList.map((element: any, idx: number) => {
            let name = element.properties.namedetails["name:ko"];
            if (typeof name === 'undefined') {
                name = element.properties.namedetails["name"];
            }
            return { index: idx, name: name };
        })
        setRows(selectedListNames);
    }
    useEffect(() => {
        setPage(0);
        setList(tripPlaceList);
    }, [tripPlaceList]); // searchResult가 바뀔 때만 effect를 재실행합니다.
    return (
        <TableContainer className={classes.tableContainer} component={Paper} id={id}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableBody>
                    {(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ).map(row => {
                        const isItemSelected = isSelected(row.index);
                        const labelId = `enhanced-table-checkbox-${row.index}`;
                        return <TableRow key={row.index}
                            onClick={() => { setClickedIndex(row.index) }}
                            selected={row.index === clickedIndex}
                            hover
                            classes={{ hover: classes.hover }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onClick={(event) => { handleClick(event, row.index); }}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row" >
                                <span className="trip-place-list-name">{row.name}</span>
                            </TableCell>
                        </TableRow>
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[]}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}