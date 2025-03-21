import Link from 'next/link';
const Header = ({currentUser}) => {

  const links = [
    currentUser && { href: '/auth/signout', label: 'Sign out'},
    !currentUser && { href: '/auth/signin', label: 'Sign in'},
    !currentUser && { href: '/auth/signup', label: 'Sign up'}
  ].filter(config => config).map(({label, href}) => { 
    return (<li key={href} className="nav-item">
      <Link href={href}>{label}</Link>
      </li>) 
  })


  return (<nav className="navbar navbar-light bg-light">
    <Link className="navbar-brand" href="/">
    GitTix
    </Link>
    <div className="d-flex justify-content-end">
      <ul className="nav d-flex align-items-center">
        {links}
      </ul>
    </div>
  </nav>)
}




export { Header };