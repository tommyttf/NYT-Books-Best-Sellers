import { useMemo, useState } from 'react';

import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  ArrowDownward,
  ArrowUpward,
  Details,
  FiberNew,
  Remove,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';

import { format } from 'date-fns';

import { IList } from '../interface/nytBook';
import { useListNames, useLists } from '../hook/listName';

const modalBoxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BestSellers = () => {
  const { listNames } = useListNames();

  const [listName, setListName] = useState('');
  const [bsDate, setBsDate] = useState<Date | null>();
  const [pDate, setPDate] = useState<Date | null>();

  const { bsl, isFetching } = useLists({
    list: listName,
    'bestsellers-date': bsDate ? format(bsDate, 'yyyy-MM-dd') : undefined,
    'published-date': pDate ? format(pDate, 'yyyy-MM-dd') : undefined,
  });
  console.log('bsl : ', bsl);

  const [bookDetail, setBookDetail] = useState<IList>();
  const columns = useMemo<GridColumns<IList>>(
    () => [
      {
        field: 'rank',
        headerName: 'Rank',
        flex: 1,
        align: 'center',
        renderCell: ({ row: { rank_last_week, rank } }) => (
          <>
            {rank}
            {rank_last_week === 0 ? (
              <FiberNew color="info" />
            ) : rank_last_week === rank ? (
              <Remove />
            ) : rank < rank_last_week ? (
              <ArrowUpward color="success" />
            ) : (
              <ArrowDownward color="error" />
            )}
          </>
        ),
      },
      {
        field: 'title',
        headerName: 'Title',
        flex: 3,
        valueGetter: ({ row }) => row.book_details[0].title || '',
      },
      {
        field: 'rank_last_week',
        headerName: 'Rank Last Week',
        flex: 2,
        align: 'center',
      },
      {
        field: 'actions',
        headerName: 'Action',
        type: 'actions',
        flex: 1,
        align: 'center',
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<Details />}
            label="Detail"
            onClick={() => setBookDetail(row)}
          />,
        ],
      },
    ],
    []
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ padding: 15 }}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="yyyy-MM-dd"
              label="Best Sellers Date"
              value={bsDate}
              onChange={setBsDate}
              renderInput={(params) => <TextField {...params} />}
              componentsProps={{
                actionBar: {
                  actions: ['today', 'clear'],
                },
              }}
            />

            <DatePicker
              inputFormat="yyyy-MM-dd"
              label="Published Date"
              value={pDate}
              onChange={setPDate}
              renderInput={(params) => <TextField {...params} />}
              componentsProps={{
                actionBar: {
                  actions: ['today', 'clear'],
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Type of List</InputLabel>
            <Select
              value={listName}
              label="Type of List"
              onChange={(e) => {
                setListName(e.target.value);
              }}
            >
              {listNames !== undefined
                ? listNames.results.map(
                    ({ list_name_encoded, display_name }) => (
                      <MenuItem
                        value={list_name_encoded}
                        key={list_name_encoded}
                      >
                        {display_name}
                      </MenuItem>
                    )
                  )
                : null}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container style={{ height: 650 }}>
        <DataGrid<IList>
          rows={bsl?.results ?? []}
          pageSize={20}
          columns={columns}
          getRowId={({ rank }) => rank}
        />
      </Grid>

      <Modal
        open={bookDetail !== undefined}
        onClose={() => setBookDetail(undefined)}
      >
        <Box sx={modalBoxStyle}>
          <Grid container justifyContent="center">
            <Grid item sx={{ fontWeight: 600 }}>
              {bookDetail?.rank}
            </Grid>
            <img
              src={`https://storage.googleapis.com/du-prd/books/images/${bookDetail?.book_details[0].primary_isbn13}.jpg`}
              alt={bookDetail?.book_details[0].title}
            />
          </Grid>

          <Typography align="center" variant="h5" sx={{ fontWeight: 800 }}>
            {bookDetail?.book_details[0].title}
          </Typography>

          <Grid container justifyContent="center" sx={{ fontWeight: 600 }}>
            by {bookDetail?.book_details[0].author}
          </Grid>

          <Grid container sx={{ fontWeight: 300 }}>
            {bookDetail?.book_details[0].description}
          </Grid>

          <Grid container justifyContent="center">
            <a
              href={bookDetail?.amazon_product_url}
              target="_blank"
              rel="noreferrer"
            >
              Check in Amazon
            </a>
          </Grid>
        </Box>
      </Modal>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
