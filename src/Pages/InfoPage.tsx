import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { DebouncedInput } from '../Utils/DebouncedInput';
import { Body, CoverCard, Content } from '../Layouts/Dashboard/templates';


const InfoPage: React.FC = () => {
    // Retrieve the stored token and details from localStorage
    const storedDetails = JSON.parse(localStorage.getItem('details') || '');
    const [data, setData] = useState([]);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    //get reqeset to the projects data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = storedDetails?.user_id;
                const url = `https://localhost:7095/api/Project/GetProjects?Id=${userId}`;
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    
    //define the react table columns types and data
    type Project = {
        id: string;
        name: string;
        score: number;
        durationInDays: number;
        bugsCount: number;
        madeDeadline: boolean;
    }

    const columns = React.useMemo<ColumnDef<Project>[]>(
        () => [
            { accessorKey: 'id', header: () => 'ID', footer: props => props.column.id, },
            { accessorKey: 'name', header: () => 'Name', footer: props => props.column.id, },
            { accessorKey: 'score', header: () => 'Score', footer: props => props.column.id, },
            { accessorKey: 'durationInDays', header: () => 'Duration In Days', footer: props => props.column.id, },
            { accessorKey: 'bugsCount', header: () => 'Bugs Count', footer: props => props.column.id, },
            { accessorKey: 'madeDeadline', header: () => 'Made DeadLine', footer: props => props.column.id, },
        ],
        []
    )

    // define the table propertis
    const table = useReactTable({ data, columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
    })

    //get the avarge score of the displayed table rows, filtred or not
    const averageScore = React.useMemo(() => {
        const scores = table.getFilteredRowModel().rows.map(row => row.original.score);
        const sum = scores.reduce((acc, score) => acc + score, 0);
        return sum / scores.length;
    }, [table.getFilteredRowModel().rows]);

    //get the percentage of projects that met the deadline
    const percentWithDeadline = React.useMemo(() => {
        const rows = table.getFilteredRowModel().rows;
        const count = rows.filter(row => row.original.madeDeadline).length;
        return (count / rows.length) * 100;
    }, [table.getFilteredRowModel().rows]);


    return (
        <Body>
                            <CoverCard>
                                            <ul className="list-inline text-center">
                                                <li className="list-inline-item" style={{  marginRight: '-40px' }} >
                                                    <img src={storedDetails?.avatar} alt="Avatar" style={{ width: '50%' }} /></li>
                                                <li className="list-inline-item">
                                                    <span className="fw-bold"> Name: </span> {storedDetails?.name}
                                                </li>
                                                <li className="list-inline-item">|</li>
                                                <li className="list-inline-item"><span className="fw-bold">Team:</span> {storedDetails?.Team}</li>
                                                <li className="list-inline-item">|</li>
                    <li className="list-inline-item"><span className="fw-bold">Joined At:  </span> {storedDetails?.joined_at}</li>
                                            </ul>
                </CoverCard>

            <Content>

                        <ul className="list-inline text-center">
                    <li className="list-inline-item border p-3 bg-secondary text-white">  Average Score: {averageScore.toFixed(2)} </li>
                    <li className="list-inline-item border p-3 bg-secondary text-white">  Percentage with Deadline: {percentWithDeadline.toFixed(2)}%</li>
                        </ul>
                                            

                                                <div className="container d-flex justify-content-center align-items-center">

                                                <table className='table table-bordered table striped'>
                                                        <thead>
                                                    {table.getHeaderGroups().map(headerGroup => (
                                                        <tr key={headerGroup.id}>
                                                            {headerGroup.headers.map(header => {
                                                                return (
                                                                    <th key={header.id} colSpan={header.colSpan}>
                                                                        {header.isPlaceholder ? null : (
                                                                            <div style={{ fontWeight:'bold'}}
                                                                                {...{
                                                                                    className: header.column.getCanSort()
                                                                                        ? 'btn'
                                                                                        : '',
                                                                                    onClick: header.column.getToggleSortingHandler(),
                                                                                }}
                                                                            >
                                                                                {flexRender(
                                                                                    header.column.columnDef.header,
                                                                                    header.getContext()
                                                                                )}
                                                                                {{
                                                                                    asc: ' 🔼',
                                                                                    desc: ' 🔽',
                                                                                }[header.column.getIsSorted() as string] ?? null}
                                                                            </div>
                                                                        )}
                                                                        <DebouncedInput
                                                                            type="text"
                                                                            value={(header.column.getFilterValue() ?? '') as string}
                                                                            onChange={value => header.column.setFilterValue(value)}
                                                                            placeholder={`Search...`}
                                                                            className="w-36 border shadow rounded"
                                                                            list={header.column.id + 'list'}
                                                                        />

                                                                    </th>
                                                                )
                                                            })}
                                                        </tr>
                                                    ))}
                                                </thead>
                                                <tbody>
                                                    {table
                                                        .getRowModel()
                                                        .rows
                                                            .map(row => {
                                                                const { score } = row.original;
                                                                const rowClassName = score > 90 ? 'table-success' : score < 70 ? 'table-danger' : '';
                                                            return (
                                                                <tr key={row.id}>
                                                                    {row.getVisibleCells().map(cell => {
                                                                        return (
                                                                            <td key={cell.id} className={rowClassName} >
                                                                                {flexRender(
                                                                                    cell.column.columnDef.cell,
                                                                                    cell.getContext()
                                                                                )}
                                                                            </td>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            )
                                                        })}
                                                </tbody>
                                            </table>
                                                </div>       
            </Content>
        </Body>

    );
};

export default InfoPage;