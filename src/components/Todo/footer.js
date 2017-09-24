import React from 'react'
import {Link} from '../Link/Link'

export class Footer extends React.Component {
  render() {
    return(
      <div>
        <Link to='/'>All</Link>
        <Link to='/active'>Active</Link>
        <Link to='/complete'>Complete</Link>
      </div>
    )
  }
}
