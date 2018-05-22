import { Form, Input, Button, Col } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

function LoginForm ({ onOk, loading, form: { validateFields, getFieldDecorator } }) {
  function okHandler() {
    validateFields((err, values) => {
      if (!err) {
        onOk(values)
      }
    })
  }
  return (
    <div className={styles.form}>
      <Form onSubmit={okHandler}>
        <FormItem {...formItemLayout} hasFeedback label="账号">
          {
            getFieldDecorator('account', {
              // initialValue: '313@20180516.E',
              rules: [{ required: true, message: '请输入您的账号!' }]
            })(<Input placeholder="请输入账号" size="large" />)
          }
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback label="密码">
          {
            getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码!' }]
            })(<Input placeholder="请输入密码" size="large" />)
          }
        </FormItem>
        <Col offset={6} span={14}>
          <Button className={styles.btn} onClick={okHandler} loading={loading}>登录</Button>
        </Col>
      </Form>
    </div>
  )
}

export default Form.create()(LoginForm)
