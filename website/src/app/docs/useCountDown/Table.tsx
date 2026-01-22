import type { ReactElement } from 'react';
import { toUpperCaseFirstLetter } from '@/lib/functions';

export interface TableItemProps {
  name: string;
  type: string;
  description: string;
}

export interface BaseTableProps {
  data: TableItemProps[];
}

export interface TableCompound {
  (): ReactElement | null;
  Parameters: () => ReactElement;
  ReturnValues: () => ReactElement;
}

const dataParameters: TableItemProps[] = [
  {
    name: 'endTime',
    type: 'number',
    description: 'The target Unix timestamp (ms) to count down to.',
  },
  {
    name: 'startOnMount',
    type: 'boolean',
    description: 'Whether the timer starts automatically on component mount. Default: false.',
  },
  {
    name: 'options.interval',
    type: 'number',
    description: 'Frequency of UI updates in milliseconds. Default: 1000.',
  },
  {
    name: 'options.onTick',
    type: '(time: number) => void',
    description: 'Callback triggered on every tick with the current remaining time.',
  },
  {
    name: 'options.onComplete',
    type: '() => void',
    description: 'Callback triggered once the remaining time reaches zero.',
  }
];

const dataReturnValues: TableItemProps[] = [
  {
    name: 'count',
    type: 'number',
    description: 'The current remaining time in milliseconds.',
  },
  {
    name: 'status',
    type: 'string',
    description: 'The current status of the timer. Status types are "start", "running", "paused", and "completed".',
  },
  {
    name: 'controls.start',
    type: '() => void',
    description: 'Initiates the countdown if status is "start".',
  },
  {
    name: 'controls.pause',
    type: '() => void',
    description: 'Pauses the timer and stores the remaining duration.',
  },
  {
    name: 'controls.resume',
    type: '() => void',
    description: 'Resumes a paused timer by calculating a new end timestamp.',
  },
  {
    name: 'controls.reset',
    type: '() => void',
    description: 'Clears the timer and reverts to the initial duration.',
  },
  {
    name: 'controls.increment',
    type: '(ms?: number) => void',
    description: 'Adds the specified milliseconds to the current countdown.'
  }
]

function BaseTable({ data }: BaseTableProps) {
  const columns = data.length > 0 ? (Object.keys(data[0]) as (keyof TableItemProps)[]) : []
  return (
    <div className='w-full overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto">
          <colgroup>
            <col className="min-w-20" />
            <col className="min-w-20" />
            <col className='min-w-72' />
          </colgroup>
          <thead className='bg-white/5'>
            <tr>
              {
                columns.map((column) => (
                  <th
                    className="font-sora text-left px-2 py-2 text-sm"
                    key={column}
                  >
                    {toUpperCaseFirstLetter(column)}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
              {
                data.map((row, idx) => (
                  <tr
                    className="border-b border-white/20 even:bg-white/4 transition-all duration-500 ease-in-out"
                    key={idx}
                  >
                    {
                      columns.map((column) => (
                        <td
                          className="font-reddit-sans px-2 py-2"
                          key={column}
                        >
                          {String(row[column])}
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableBase = () => null;

const Table = TableBase as TableCompound;

Table.Parameters = function TableParameters() {
  return <BaseTable data={dataParameters} />
}

Table.ReturnValues = function TableReturnValues() {
  return <BaseTable data={dataReturnValues} />
}

export default Table;
