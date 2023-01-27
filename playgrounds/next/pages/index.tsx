import { Button } from '@itwin/itwinui-react';

import * as React from 'react';
import { Table, DefaultCell } from '@itwin/itwinui-react';
// import type { CellProps, CellRendererProps, Column } from 'react-table';
// import type {
//   CellProps,
//   CellRendererProps,
//   Column,
//   testing,
//   FieldTyp
// } from 'react-table';
// } from '@itwin/itwinui-react';
// } from '../../../packages/itwinui-react';

export default function Home() {
  type TableStoryDataType = {
    product: string;
    price: number;
    quantity: number;
    rating: number;
    status: 'positive' | 'negative' | 'warning' | undefined;
    subRows: TableStoryDataType[];
  };

  const generateItem = React.useCallback(
    (index: number, parentRow = '', depth = 0): TableStoryDataType => {
      const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
      const rating = Math.round(Math.random() * 5);
      return {
        product: `Product ${keyValue}`,
        price: ((index % 10) + 1) * 15,
        quantity: ((index % 10) + 1) * 150,
        rating: rating,
        status:
          rating >= 4 ? 'positive' : rating === 3 ? 'warning' : 'negative',
        subRows:
          depth < 1
            ? Array(Math.round(index % 2))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = React.useMemo(
    () =>
      Array(3)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const columns = React.useMemo(
    (): Column<TableStoryDataType>[] => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        width: '40%',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>${props.value}</>;
        },
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        cellRenderer: (props: CellRendererProps<TableStoryDataType>) => {
          return (
            <DefaultCell
              {...props}
              status={props.cellProps.row.original.status}
            >
              {props.cellProps.row.original.rating}/5
            </DefaultCell>
          );
        },
      },
    ],
    [],
  );

  const rowProps = React.useCallback((row: any) => {
    return {
      status: row.original.status,
    };
  }, []);

  return (
    <div style={{ width: '300px' }}>
      <Table
        // columnsQ3={[{}]}
        // columnsQ1={[{}]}
        // columnsQ2={[{}]}

        // columns={[{}]}
        // columns={[
        //   {
        //     ,
        //   },
        // ]}
        // columns={[
        //   {
        //     col,
        //   },
        // ]}
        // col
        // columns={[
        //   {
        //     id: 'product',
        //     // columns
        //     // col
        //     // qqq: '',
        //     // qqq1: '',
        //     // col
        //   },
        // ]}
        // columns={[
        //   {
        //     co
        //   }
        // ]}
        // columns={[
        //   {

        //   },
        // ]}
        // columnsQQ={[
        //   {
        //     col,
        //   },
        // ]}
        // columnsL={[{}]}
        // columnsQ={[]}
        emptyTableContent='No data.'
        data={data}
        style={{ height: '100%' }}
        rowProps={rowProps}
        density='condensed'
      />
    </div>
  );
}
