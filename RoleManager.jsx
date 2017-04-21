import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { Segment, Checkbox, Grid, Header, Search } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

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
    const { results, loading, roles, columns } = this.props;

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
					columns={columns}
					entries={results}
					loading={loading}
				/>
        
      </Segment>
    );
  }
}

RoleManager.propTypes = {
  loading 				: PropTypes.bool,
  onOptionChange 	: PropTypes.func,
  results 				: PropTypes.arrayOf( PropTypes.object ),
  roles 					: PropTypes.arrayOf( PropTypes.string ),
  columns 				: PropTypes.arrayOf(
		  								PropTypes.oneOfType([
		  									PropTypes.string,
		  									PropTypes.shape({
											    name: PropTypes.string,
											    as: PropTypes.func // React Component Proto
										  	})
										  ])),
};