import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ search: '' });
  }

  handleInput(type) {
    return e => {
      const element = e.target;
      this.setState({ [type]: element.value });
    };
  } 

    render() {
      const users = this.props.users.map(user => {
        const full_name = `${user.first_name} ${user.last_name}`.toLowerCase();

        if (this.state.search !== "" && 
          full_name.includes(this.state.search.toLowerCase())) {
          return (
            <Link to={"/users/" + user.id} key={user.id} onClick={() => {
                this.setState({ search: '' })
            }}>
              <li>
                {user.first_name} {user.last_name}
              </li>
            </Link>
          )
        }
      });

      return (
        <>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.search}
              placeholder="Search"
              onChange={this.handleInput("search")}
            />
            <div className="submit-button">
              <input type="submit" value="" className="search-icon center" />
            </div>
          </form>
          <ul className="search-results">{users}</ul>
        </>
      )
    }
}

export default Search;