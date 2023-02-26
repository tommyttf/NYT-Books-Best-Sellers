import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, TextField, TextFieldProps } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';

import { useBSHist } from '../hook/listName';
import { IBSHist } from '../interface/nytBook';

export const BestSellersHistory = () => {
  const [rows, setRows] = useState<IBSHist[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [author, setAuthor] = useState<string>();
  const authorInputRef = useRef<TextFieldProps>(null);

  const setQueryParams = () => {
    if (
      typeof authorInputRef.current?.value === 'string' &&
      authorInputRef.current.value !== ''
    ) {
      setAuthor(authorInputRef.current.value);
      setRows([]);
      setLoading(true);
    }
  };

  const { bsh, isFetching } = useBSHist({
    offset,
    author,
  });
  useEffect(() => {
    if (bsh !== undefined) {
      setRows((r) => r.concat(bsh.results));
      setLoading(false);
    }
  }, [bsh]);
  console.log('rows : ', rows, bsh);

  const columns = useMemo<GridColumns<IBSHist>>(
    () => [
      { field: 'title', headerName: 'Title', flex: 1, align: 'center' },
      { field: 'publisher', headerName: 'Publisher', flex: 1, align: 'center' },
      { field: 'author', headerName: 'Author', flex: 1, align: 'center' },
    ],
    []
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ padding: 15 }}>
        <Grid item xs={6}>
          <TextField
            type="text"
            variant="standard"
            label="Author"
            inputRef={authorInputRef}
          />
        </Grid>

        <Grid item xs={6}>
          <Button
            style={{ color: '#ffffff', backgroundColor: '#000066' }}
            onClick={setQueryParams}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ padding: 15, height: 650 }}>
        <DataGridPro
          columns={columns}
          rows={rows}
          getRowId={({ title, publisher, description, isbns }) =>
            title + publisher + description + isbns?.[0]?.isbn10
          }
          loading={isLoading && isFetching}
          pageSize={20}
          hideFooterPagination
          onRowsScrollEnd={() => {
            if (bsh !== undefined && offset < bsh.num_results) {
              setLoading(true);
              setOffset((o) => o + 20);
            }
          }}
        />
      </Grid>
    </Box>
  );
};
