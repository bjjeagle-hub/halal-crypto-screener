import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiLogOut } from 'react-icons/fi';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-dark-blue);
  font-weight: 700;
  font-size: 24px;
  gap: 12px;

  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary-gold) 0%, #B8941F 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 16px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-gray);
  font-size: 14px;

  .user-email {
    font-weight: 500;
  }

  .screenings-left {
    background: var(--secondary-light-blue);
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
    color: var(--primary-dark-blue);
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--text-gray);
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--primary-gold);
    background: var(--secondary-light-blue);
  }
`;

const Header = () => {
  const { user, logout, isAuthenticated, isPremium, freeScreeningsLeft } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <div className="logo-icon">HS</div>
          <span>Halal Screener</span>
        </Logo>

        <Nav>
          {isAuthenticated ? (
            <>
              <UserInfo>
                <span className="user-email">{user.email}</span>
                {!isPremium && (
                  <span className="screenings-left">
                    {freeScreeningsLeft} free left
                  </span>
                )}
                {isPremium && (
                  <span className="screenings-left">Premium</span>
                )}
              </UserInfo>
              <IconButton onClick={handleLogout}>
                <FiLogOut size={18} />
                Logout
              </IconButton>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn btn-outline">
                <FiUser size={18} />
                Sign In
              </Link>
            </>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;