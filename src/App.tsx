import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { Column, Table } from './components/Table/Table';
import { createEffect, createSignal } from 'solid-js';
import { Paginator } from './components/Paginator/Paginator';

const App: Component = () => {
  const [selectedRow, setSelectedRow] = createSignal<any>(null);

  const tableData = [
    {
      "firstName": "Savage",
      "lastName": "Norris",
      "age": 5
    },
    {
      "firstName": "Parker",
      "lastName": "Bryant",
      "age": 10
    },
    {
      "firstName": "Asra",
      "lastName": "Langley",
      "age": 5
    },
    {
      "firstName": "Gomez",
      "lastName": "Mccray",
      "age": 0
    },
    {
      "firstName": "Nico",
      "lastName": "Nolan",
      "age": 6
    },
    {
      "firstName": "Shawn",
      "lastName": "Foreman",
      "age": 0
    },
    {
      "firstName": "Emery",
      "lastName": "Gould",
      "age": 10
    },
    {
      "firstName": "Riley",
      "lastName": "Newman",
      "age": 3
    },
    {
      "firstName": "Farren",
      "lastName": "Solomon",
      "age": 6
    },
    {
      "firstName": "Jody",
      "lastName": "Solomon",
      "age": 9
    },
    {
      "firstName": "Hildred",
      "lastName": "Rosales",
      "age": 1
    },
    {
      "firstName": "Shawn",
      "lastName": "Bright",
      "age": 4
    },
    {
      "firstName": "Bailey",
      "lastName": "Simmons",
      "age": 4
    },
    {
      "firstName": "Sage",
      "lastName": "Case",
      "age": 9
    },
    {
      "firstName": "Campbell",
      "lastName": "Allen",
      "age": 10
    },
    {
      "firstName": "Shawn",
      "lastName": "Austin",
      "age": 10
    },
    {
      "firstName": "Emery",
      "lastName": "Harding",
      "age": 2
    },
    {
      "firstName": "Hildred",
      "lastName": "Langley",
      "age": 7
    },
    {
      "firstName": "Duffy",
      "lastName": "Bright",
      "age": 5
    },
    {
      "firstName": "Gomez",
      "lastName": "Case",
      "age": 6
    },
    {
      "firstName": "Jean",
      "lastName": "Austin",
      "age": 9
    },
    {
      "firstName": "Emery",
      "lastName": "Guthrie",
      "age": 8
    },
    {
      "firstName": "Rory",
      "lastName": "Rosales",
      "age": 4
    },
    {
      "firstName": "Bailey",
      "lastName": "Burke",
      "age": 4
    },
    {
      "firstName": "Jody",
      "lastName": "Allen",
      "age": 6
    },
    {
      "firstName": "Shiloh",
      "lastName": "Ellison",
      "age": 2
    },
    {
      "firstName": "Vasquez",
      "lastName": "Sexton",
      "age": 9
    },
    {
      "firstName": "Jude",
      "lastName": "Reed",
      "age": 6
    },
    {
      "firstName": "Mildred",
      "lastName": "Black",
      "age": 5
    },
    {
      "firstName": "Campbell",
      "lastName": "Phillips",
      "age": 1
    },
    {
      "firstName": "Riley",
      "lastName": "Reed",
      "age": 3
    },
    {
      "firstName": "Bailey",
      "lastName": "Webster",
      "age": 2
    },
    {
      "firstName": "Mildred",
      "lastName": "Battle",
      "age": 3
    },
    {
      "firstName": "Parker",
      "lastName": "Figueroa",
      "age": 5
    },
    {
      "firstName": "Shawn",
      "lastName": "Newman",
      "age": 4
    },
    {
      "firstName": "Rory",
      "lastName": "Harrison",
      "age": 1
    },
    {
      "firstName": "Embry",
      "lastName": "Norris",
      "age": 3
    },
    {
      "firstName": "Bailey",
      "lastName": "Harrison",
      "age": 10
    },
    {
      "firstName": "Savage",
      "lastName": "Rosales",
      "age": 9
    },
    {
      "firstName": "Parker",
      "lastName": "Hutchinson",
      "age": 5
    },
    {
      "firstName": "Bates",
      "lastName": "Webster",
      "age": 6
    },
    {
      "firstName": "Savage",
      "lastName": "Black",
      "age": 1
    },
    {
      "firstName": "Chance",
      "lastName": "Allen",
      "age": 2
    },
    {
      "firstName": "Jean",
      "lastName": "Mccray",
      "age": 10
    },
    {
      "firstName": "Duffy",
      "lastName": "Newman",
      "age": 3
    },
    {
      "firstName": "Emery",
      "lastName": "Solomon",
      "age": 6
    },
    {
      "firstName": "Rory",
      "lastName": "Christensen",
      "age": 6
    },
    {
      "firstName": "Asra",
      "lastName": "Battle",
      "age": 8
    },
    {
      "firstName": "Campbell",
      "lastName": "West",
      "age": 6
    },
    {
      "firstName": "Bailey",
      "lastName": "Webster",
      "age": 4
    }
  ];

  const columns = [
    {
        code: "firstName",
        header: "First Name"
    },
    {
        code: "lastName",
        header: "Last Name"
    },
    {
        code: "age",
        header: "Age"
    }
  ];

  createEffect(() => {
    console.log(selectedRow())
  })

  const selectionChanged = (value: any) => {
    console.log(value)
    setSelectedRow(value)
  }

  return (
      <>
        {/*<Paginator*/}
        {/*    first={first()}*/}
        {/*    rows={rows()}*/}
        {/*    totalRecords={100}*/}
        {/*    onPageChange={onPageChange}*/}
        {/*/>*/}
        <Table
            data={tableData}
            columns={columns}
            showGridlines
            paginator
            rows={5}
            totalRecords={tableData.length}
            globalFilter
            selectionMode="single"
            selection={selectedRow()}
            onSelectionChange={(value) => {
              selectionChanged(value)
            }}>
        </Table>
      </>
  );
};

export default App;
