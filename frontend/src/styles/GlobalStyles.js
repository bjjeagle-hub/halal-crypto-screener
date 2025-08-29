import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
    color: #1a202c;
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Swiss Islamic Finance Brand Colors */
  :root {
    --primary-gold: #D4AF37;
    --primary-dark-blue: #1B365D;
    --secondary-light-blue: #E8F3FF;
    --success-green: #10B981;
    --warning-orange: #F59E0B;
    --danger-red: #EF4444;
    --text-dark: #1A202C;
    --text-gray: #4A5568;
    --text-light: #718096;
    --bg-white: #FFFFFF;
    --bg-light: #F8FAFC;
    --border-gray: #E2E8F0;
  }

  /* Common button styles */
  .btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary-gold) 0%, #B8941F 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }

  .btn-secondary {
    background: var(--primary-dark-blue);
    color: white;
  }

  .btn-secondary:hover {
    background: #0F2A47;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(27, 54, 93, 0.3);
  }

  .btn-outline {
    background: transparent;
    border: 2px solid var(--primary-gold);
    color: var(--primary-gold);
  }

  .btn-outline:hover {
    background: var(--primary-gold);
    color: white;
  }

  /* Form styles */
  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-gray);
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s ease-in-out;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-gold);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }

  /* Card styles */
  .card {
    background: var(--bg-white);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border-gray);
  }

  .card-header {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-gray);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .btn {
      padding: 10px 20px;
      font-size: 14px;
    }
    
    .card {
      padding: 16px;
    }
  }
`;