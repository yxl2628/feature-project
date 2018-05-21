import styles from './index.css'
import { connect } from 'dva'
import LoginForm from './components/LoginForm'

function Login({ dispatch, loading }) {
  function login ({account, password}){
    dispatch({
      type: 'user/login',
      payload: { account, password }
    })
  }
  return (
    <div className={styles.content}>
      <div className={styles.login}>
        <div className={styles.title}>账号登录</div>
        <LoginForm onOk={login} loading={loading} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.user
  }
}

export default connect(mapStateToProps)(Login)
