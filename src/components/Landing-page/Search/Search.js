import React from 'react';
import { Input, Icon } from 'semantic-ui-react';

import './search.css';

const Search = ({ size }) => (
  <Input
    iconPosition="left"
    size={size}
    action={{
      content: 'Search',
      size: `${size}`,
      color: 'red',
    }}
    icon="map marker alternate"
    placeholder="Search..."
    className="search-container"
  />
);

export default Search;
