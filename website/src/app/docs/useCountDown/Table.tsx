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
    description: 'The absolute Unix timestamp (in milliseconds) when the countdown finishes.',
  },
  {
    name: 'startOnMount',
    type: 'boolean',
    description: 'Whether to start the countdown on mount. Default: false.',
  },
  {
    name: 'options.interval',
    type: 'number',
    description: 'Frequency of updates in milliseconds. Default: 1000.',
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
    description: 'The remaining time in milliseconds (clamped at 0).',
  },
  {
    name: 'isPaused',
    type: 'boolean',
    description: 'Boolean flag indicating if the timer is currently paused.',
  },
  {
    name: 'status',
    type: 'string',
    description: 'The current status of the timer. Status types are "start", "running", "paused", and "completed".',
  },
  {
    name: 'controls.pause',
    type: '() => void',
    description: 'Stops the timer and captures the current remaining duration.',
  },
  {
    name: 'controls.resume',
    type: '() => void',
    description: 'Calculates a new endTime and restarts the interval.',
  },
  {
    name: 'controls.reset',
    type: '(newTime?: number) => void',
    description: 'Restarts the timer using the initial or a newly provided timestamp.',
  },
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
