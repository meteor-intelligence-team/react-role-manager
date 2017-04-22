import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import TableGenerator from '@techexmachina/react-table-generator';
import { Segment, Checkbox, Grid, Header, Search, Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


class RoleDropdown extends Component {
  constructor( props ){
    super( props );
    autobind( this );

    const roles = [...this.props.roles];
    const options = roles.map( role => ({
      key       : role,
      value     : role,
      text      : role,
    }) );

    this.state = {
      options,
      value: [...props.roles],
    };
  }

  handleChange( event, { value } ){
    this.setState({ value });
    this.props.onRoleChange( value, this.props._id );
  }

  handleAddition( event, { value } ){
    const options = [...this.state.options].filter( ({ key }) => key !== value );

    options.push({ value,
      key   : value,
      text  : value,
    });

    this.setState({ options });
  }

  render(){
    const { value, options } = this.state;

    return (
      <Dropdown
        placeholder='Roles'
        options={options}
        value={value}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
        allowAdditions
        fluid
        search
        multiple
        selection
      />
    );
  }
}

RoleDropdown.propTypes = {
  onRoleChange  : PropTypes.func.isRequired,
  roles         : PropTypes.arrayOf( PropTypes.string ).isRequired,
  _id           : PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                  ]).isRequired,
};


export default class RoleManager extends Component {
  constructor( props ){
    super( props );
    autobind( this );

    this.state = {
      roleList: [],
      searchValue: "",
    };
  }

  onCheckRole( event, { label, checked } ){
    const roleList = [...this.state.roleList].filter( role => role !== label );
    const { searchValue } = this.state;

    if ( checked ) roleList.push( label );

    this.setState({ roleList });
    this.props.onOptionChange( roleList, searchValue );
  }

  handleSearchChange( event, searchValue ){
    const { roleList } = this.state;
    this.setState({ searchValue });
    this.props.onOptionChange( roleList, searchValue );
  }

  strOrComp( value ){
    return ( typeof value === "string" );
  }

  render(){
    const { searchValue } = this.state;
    const { results, loading, roles, columns, onRoleChange } = this.props;
    const extendedColumns = [...columns];

    extendedColumns.push({
      name            : 'Roles',
      as              : RoleDropdown,
      additionalProps : { onRoleChange },
    });

    return (
      <Segment >
        <Header dividing>Roles</Header>
        <Grid divided='vertically' centered>
          {roles.map(role=>
            <Grid.Column key={role} mobile={8} tablet={4} computer={2} >
              <Checkbox
                label={role}
                onChange={this.onCheckRole}
              />
            </Grid.Column>
          )}
        </Grid>

        <Header dividing>Search</Header>
        <Search
          onSearchChange={this.handleSearchChange}
          loading={loading}
          value={searchValue}
        />

        <TableGenerator
          title="Results"
          columns={extendedColumns}
          entries={results}
          loading={loading}
        />
        
      </Segment>
    );
  }
}

RoleManager.propTypes = {
  loading         : PropTypes.bool,
  onRoleChange    : PropTypes.func.isRequired,
  onOptionChange  : PropTypes.func.isRequired,
  roles           : PropTypes.arrayOf( PropTypes.string ).isRequired,
  results         : PropTypes.arrayOf(
                      PropTypes.shape({
                        roles : PropTypes.arrayOf( PropTypes.string ).isRequired,
                        _id   : PropTypes.oneOfType([
                                  PropTypes.string,
                                  PropTypes.number,
                                ]).isRequired,
                      })
                    ),
  columns         : PropTypes.arrayOf(
                      PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.shape({
                          name            : PropTypes.string.isRequired,
                          as              : PropTypes.func.isRequired, // React Component Proto
                          additionalProps : PropTypes.object,
                        })
                      ])
                    ).isRequired,
};