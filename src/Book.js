import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static PropTypes = {
        book: PropTypes.object.isRequired
      } 

      render(){
        const { book } = this.props
    
        return (
          <div>dog</div>
        )
      }
    }
    
    export default Book
}