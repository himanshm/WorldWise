import { NavLink } from 'react-router-dom';

function MainNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          <NavLink to='/Pricing'>Pricing</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
