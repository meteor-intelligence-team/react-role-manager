# react-role-manager

> Simple [React](http://facebook.github.io/react/index.html) component to manage users roles/teams based on [Semantic UI for React](https://github.com/Semantic-Org/Semantic-UI-React)

## Install

```bash
npm i --save @techexmachina/react-role-manager
```

## Example

```javascript
import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import RoleManager from '@techexmachina/react-role-manager';
import { Segment, Checkbox, Grid, Header, Table, Search, Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const roles = [
  "super-admin",
  "admin",
  "author",
  "subscriber",
  "user",
];

const users = [
  {
    _id: 1,
    name: "david",
    roles: ['admin'],
  },
  {
    _id: 2,
    name: "simon",
    roles: ['subscriber'],
  },
  {
    _id: 3,
    name: "sylvain",
    roles: ['author'],
  },
  {
    _id: 4,
    name: "francois",
    roles: ['subscriber'],
  },
  {
    _id: 5,
    name: "jimmy",
    roles: ['admin'],
  },
];

/********************************************************/

export class RoleManagerExample extends Component {
  constructor( props ){
    super( props );
    autobind( this );
    this.state = {
      loading: false,
      results: [],
      columns: [
        '_id',
        'name',
      ],
    };
  }

  handeOptionChange( roles, searchValue ){
    this.setState({ loading: true });

    searchValue = searchValue.trim();

    if ( !roles.length && !searchValue ) this.setState({ loading: false, results: [] });
    else setTimeout( f => {
      const regexp = new RegExp( searchValue, 'i' );
      const results = users.filter( user => (
        ( !roles.length && regexp.test( user.name ) ) ||
        ( roles.length && roles.indexOf( user.roles[0] ) >= 0 && regexp.test( user.name ) ) ||
        ( !searchValue && roles.length && roles.indexOf( user.roles[0] ) >= 0 )
      ) );
      
      this.setState({ loading: false, results });
    }, 500 );
  }

  handleRoleChange( newRoles, userId ){
    console.log("Attributing new roles to " + userId, newRoles);
    // Update your databse here
  }

  render(){
    const { loading, results, columns } = this.state;

    return (
      <RoleManager
        loading={loading}
        results={results}
        onOptionChange={this.handeOptionChange}
        roles={roles}
        columns={columns}
        onRoleChange={this.handleRoleChange}
      />
    );
  }
}



```

### Props

#### RoleManager props

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|loading|`boolean`| NO | Set to true if entries are being fetched / computed
|onRoleChange|`function`| YES | A callback used to catch role changes on a specific user. Receives an array of roles (`strings`) & a user _id as parameters
|onOptionChange|`function`| YES | A callback used to be called when the `Search` field or a role `Checkbox` is updated. Receives an array of roles (`strings`) & a search `string` as parameters
|roles|`[string]`| YES | An array of strings to display the different roles/teams that can be (un)checked for changing search options
|results|`[object]`| NO | An array of user objects to fill the `TableGenerator`. Each object must have at least a `roles` attribute (array of `string`) and an `_id` (`string` or `number`)
|columns|`[string` or `object]`| YES | An array of string or object representing the different columns displayed by the `TableGenerator`. Strings should match of the user object property. Objects must contains at least a `name` (`string`) property for naming the column, and a `as` property, which is a React.Component prototype of your choice to be displayed in the cell. Objects can also have an arbitrary `additionalProps` property, which will be passed to the `as` component.

## Notes

The RoleManager is based on `react-table-generator` module. It will automaticaly add an additional column to the `Table` with a semantic `Dropdown` in order to let you remove and add roles to users. The dropdown will automatically receive the `onRoleChange` prop and the user `roles` and `_id`

## Contributors

* David Panart (@Fen747)


---

MIT Licensed