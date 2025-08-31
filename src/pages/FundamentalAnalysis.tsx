import React, { useState, useEffect } from 'react';
import HeadBox from '../components/HeadBox';
import styles from '../styles/components/FundamentalAnalysis.module.scss';

interface CompanyData {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  marketCap: string;
  peRatio: number;
  pbRatio: number;
  dividendYield: number;
  eps: number;
  revenue: string;
  profit: string;
  debtToEquity: number;
  currentPrice: number;
  change: number;
  changePercent: number;
}

const FundamentalAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<CompanyData[]>([]);

  // Mock data for demonstration - in real app, this would come from an API
  const mockCompanies: CompanyData[] = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Limited',
      sector: 'Energy',
      industry: 'Oil & Gas Refining & Marketing',
      marketCap: '₹1,800,000 Cr',
      peRatio: 28.5,
      pbRatio: 2.8,
      dividendYield: 0.35,
      eps: 145.67,
      revenue: '₹900,000 Cr',
      profit: '₹67,000 Cr',
      debtToEquity: 0.45,
      currentPrice: 4123.45,
      change: 45.67,
      changePercent: 1.12
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services Limited',
      sector: 'Technology',
      industry: 'IT Services & Consulting',
      marketCap: '₹1,250,000 Cr',
      peRatio: 32.1,
      pbRatio: 12.5,
      dividendYield: 1.8,
      eps: 89.23,
      revenue: '₹225,000 Cr',
      profit: '42,000 Cr',
      debtToEquity: 0.1,
      currentPrice: 2856.78,
      change: -12.34,
      changePercent: -0.43
    },
    {
      symbol: 'HDFC',
      name: 'Housing Development Finance Corporation',
      sector: 'Financial Services',
      industry: 'Mortgage Finance',
      marketCap: '₹450,000 Cr',
      peRatio: 18.9,
      pbRatio: 2.1,
      dividendYield: 1.2,
      eps: 67.89,
      revenue: '₹180,000 Cr',
      profit: '25,000 Cr',
      debtToEquity: 6.8,
      currentPrice: 1289.45,
      change: 23.67,
      changePercent: 1.87
    }
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 1) {
      const filtered = mockCompanies.filter(company =>
        company.name.toLowerCase().includes(term.toLowerCase()) ||
        company.symbol.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectCompany = (company: CompanyData) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCompany(company);
      setSearchResults([]);
      setSearchTerm(company.name);
      setIsLoading(false);
    }, 500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  return (
    <div className={styles.container}>
      <HeadBox
        title="Fundamental Analysis"
        subtitle="Analyze company fundamentals and financial data"
        backRoute="/Dashboard"
      />

      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for a company (e.g., Reliance, TCS, HDFC)"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.searchIcon}>🔍</div>
        </div>

        {searchResults.length > 0 && (
          <div className={styles.searchResults}>
            {searchResults.map((company) => (
              <div
                key={company.symbol}
                className={styles.searchResult}
                onClick={() => selectCompany(company)}
              >
                <div className={styles.companySymbol}>{company.symbol}</div>
                <div className={styles.companyName}>{company.name}</div>
                <div className={styles.companySector}>{company.sector}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading company data...</p>
        </div>
      )}

      {selectedCompany && !isLoading && (
        <div className={styles.companyDetails}>
          <div className={styles.companyHeader}>
            <div className={styles.companyInfo}>
              <h2 className={styles.companyName}>{selectedCompany.name}</h2>
              <div className={styles.companySymbol}>{selectedCompany.symbol}</div>
              <div className={styles.companySector}>{selectedCompany.sector} • {selectedCompany.industry}</div>
            </div>
            <div className={styles.priceInfo}>
              <div className={styles.currentPrice}>{formatCurrency(selectedCompany.currentPrice)}</div>
              <div className={`${styles.priceChange} ${selectedCompany.change >= 0 ? styles.positive : styles.negative}`}>
                {selectedCompany.change >= 0 ? '+' : ''}{selectedCompany.change.toFixed(2)} ({selectedCompany.changePercent >= 0 ? '+' : ''}{selectedCompany.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <h3>Market Cap</h3>
              <div className={styles.metricValue}>{selectedCompany.marketCap}</div>
            </div>

            <div className={styles.metricCard}>
              <h3>P/E Ratio</h3>
              <div className={styles.metricValue}>{selectedCompany.peRatio.toFixed(1)}</div>
            </div>

            <div className={styles.metricCard}>
              <h3>P/B Ratio</h3>
              <div className={styles.metricValue}>{selectedCompany.pbRatio.toFixed(1)}</div>
            </div>

            <div className={styles.metricCard}>
              <h3>Dividend Yield</h3>
              <div className={styles.metricValue}>{selectedCompany.dividendYield.toFixed(2)}%</div>
            </div>

            <div className={styles.metricCard}>
              <h3>EPS</h3>
              <div className={styles.metricValue}>₹{selectedCompany.eps.toFixed(2)}</div>
            </div>

            <div className={styles.metricCard}>
              <h3>Revenue</h3>
              <div className={styles.metricValue}>{selectedCompany.revenue}</div>
            </div>

            <div className={styles.metricCard}>
              <h3>Net Profit</h3>
              <div className={styles.metricValue}>{selectedCompany.profit}</div>
            </div>

            <div className={styles.metricCard}>
              <h3>Debt/Equity</h3>
              <div className={styles.metricValue}>{selectedCompany.debtToEquity.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundamentalAnalysis;
