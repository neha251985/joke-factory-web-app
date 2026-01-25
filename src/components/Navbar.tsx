import { NavLink } from "react-router-dom"

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  marginRight: 12,
  textDecoration: "none",
  fontWeight: isActive ? 700 : 400,
})

export default function Navbar() {
  return (
    <nav style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>

      <NavLink to="/favorites" style={linkStyle}>
        Favorites
      </NavLink>
    </nav>
  )
}
