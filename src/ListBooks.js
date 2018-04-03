import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
    static PropTypes = {
        books: PropTypes.array.isRequired
    }

    render(){
        const { books } = this.props;

        let showingBooks;

        return (
            <div>Dog</div>
        )

    }

}

export default ListBooks