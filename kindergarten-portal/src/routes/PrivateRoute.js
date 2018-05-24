import { Route } from 'react-router-dom'
import Redirect from 'umi/redirect'

export default ({ render, ...rest }) => {
  const _info = sessionStorage.getItem('_info')
  const loginStatus = _info ? true : false

  return (
    <Route
      {...rest}
      render={props =>
        loginStatus ? (
          <div style={{absolute:'relative'}}>
            { render(props) }
          </div>
        ) : (
          <Redirect to={{ pathname: "/login/", state: { from: props.location } }}/>
        )
      }
    />
  )
}
