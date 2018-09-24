import Redirect from 'umi/redirect'

export default () => {
  const sUserAgent = window.navigator.userAgent;
  if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
    return <Redirect to="/mobile/?category=a" />
  } else {
    return <Redirect to="/pc/?category=a" />
  }
}
