import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Dept from './Dept';

const Depts = () => (
    <Query
        query={gql`
      {
        departments{departmentId departmentName managerId location{ name country} employees{firstName lastName} }
      }
    `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.departments.map((currentDept) => (
                <Dept dept={currentDept} />
            ));
        }}
    </Query>
);
export default Depts;