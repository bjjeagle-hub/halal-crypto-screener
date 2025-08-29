import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiShield, FiCheck, FiStar } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const LandingContainer = styled.div`
  flex: 1;
  background: linear-gradient(135deg, var(--bg-light) 0%, var(--secondary-light-blue) 100%);
`;

const Hero = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--primary-dark-blue);
  margin-bottom: 24px;
  line-height: 1.2;

  .highlight {
    background: linear-gradient(135deg, var(--primary-gold) 0%, #B8941F 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  color: var(--text-gray);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  margin: 0 auto 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-gray);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 16px 20px;
  border: 2px solid var(--border-gray);
  border-radius: 12px;
  font-size: 18px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: var(--primary-gold);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }

  &::placeholder {
    color: var(--text-light);
  }
`;

const SearchButton = styled.button`
  padding: 16px 32px;
  background: linear-gradient(135deg, var(--primary-gold) 0%, #B8941F 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FreeUsageNote = styled.p`
  color: var(--text-gray);
  font-size: 14px;
  text-align: center;
  margin-bottom: 0;
`;

const Features = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 40px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-gray);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--primary-gold) 0%, #B8941F 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-dark-blue);
  margin-bottom: 16px;
`;

const FeatureDescription = styled.p`
  color: var(--text-gray);
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-dark-blue);
  text-align: center;
  margin-bottom: 16px;
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-gray);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { canScreen, useFreeScreening, isAuthenticated } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('Please enter a cryptocurrency name or symbol');
      return;
    }

    if (!canScreen()) {
      toast.error('You have used all your free screenings. Please sign up for unlimited access.');
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      // Use free screening if not authenticated
      if (!isAuthenticated) {
        useFreeScreening();
      }

      // Navigate to results page
      navigate(`/results/${encodeURIComponent(searchQuery.trim())}`);
    } catch (error) {
      toast.error('Error initiating screening');
    } finally {
      setLoading(false);
    }
  };

  const { freeScreeningsLeft } = useAuth();

  return (
    <LandingContainer>
      <Hero>
        <HeroTitle>
          Screen Any Crypto for <span className="highlight">Halal</span> Compliance
        </HeroTitle>
        <HeroSubtitle>
          Get detailed Islamic finance compliance analysis for any cryptocurrency
          with our comprehensive screening tool powered by Swiss Islamic Finance expertise.
        </HeroSubtitle>

        <SearchSection>
          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Enter cryptocurrency name or symbol (e.g., Bitcoin, BTC)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
            <SearchButton type="submit" disabled={loading || !canScreen()}>
              <FiSearch size={20} />
              {loading ? 'Screening...' : 'Screen Now'}
            </SearchButton>
          </SearchForm>
          
          {!isAuthenticated && (
            <FreeUsageNote>
              🎉 Get {freeScreeningsLeft} free screenings, then sign up for unlimited access
            </FreeUsageNote>
          )}
        </SearchSection>
      </Hero>

      <Features>
        <SectionTitle>Why Choose Our Halal Crypto Screener?</SectionTitle>
        <SectionSubtitle>
          Comprehensive analysis based on Islamic finance principles
        </SectionSubtitle>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FiShield size={32} />
            </FeatureIcon>
            <FeatureTitle>Comprehensive Analysis</FeatureTitle>
            <FeatureDescription>
              Detailed evaluation across multiple Islamic finance criteria including 
              business model, revenue sources, and compliance with Shariah principles.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiCheck size={32} />
            </FeatureIcon>
            <FeatureTitle>Granular Scoring</FeatureTitle>
            <FeatureDescription>
              Get precise compliance percentages with clear explanations for each 
              evaluation criterion and transparent scoring methodology.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiStar size={32} />
            </FeatureIcon>
            <FeatureTitle>Expert Backed</FeatureTitle>
            <FeatureDescription>
              Our screening methodology is developed in collaboration with Swiss Islamic 
              Finance experts and follows established Shariah compliance frameworks.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Features>
    </LandingContainer>
  );
};

export default LandingPage;