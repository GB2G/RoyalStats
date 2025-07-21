import React, { useState } from 'react';
import { useLanguage, translations } from '../components/LanguageContext';
import './Prices.css';
import { Line } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const shipDetails = {
  'Oasis Class': {
    ships: ['Oasis of the Seas', 'Allure of the Seas', 'Harmony of the Seas', 'Symphony of the Seas', 'Wonder of the Seas'],
  },
  'Quantum Class': {
    ships: ['Quantum of the Seas', 'Anthem of the Seas', 'Ovation of the Seas', 'Spectrum of the Seas'],
  },
  'Freedom Class': {
    ships: ['Freedom of the Seas', 'Liberty of the Seas', 'Independence of the Seas'],
  },
  'Voyager Class': {
    ships: ['Voyager of the Seas', 'Explorer of the Seas', 'Adventure of the Seas', 'Navigator of the Seas', 'Mariner of the Seas'],
  },
  'Radiance Class': {
    ships: ['Radiance of the Seas', 'Brilliance of the Seas', 'Serenade of the Seas', 'Jewel of the Seas'],
  },
  'Vision Class': {
    ships: ['Vision of the Seas', 'Rhapsody of the Seas', 'Enchantment of the Seas', 'Grandeur of the Seas'],
  },
  'Icon Class': {
    ships: ['Icon of the Seas'],
  }
};

const Prices = () => {
  const labels = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  const datasets = [
    {
      label: 'Oasis Class',
      data: [950, 980, 960, 940, 970, 1000, 1020],
      borderColor: '#36a2eb',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.4
    },
    {
      label: 'Quantum Class',
      data: [1050, 1080, 1070, 1060, 1090, 1120, 1150],
      borderColor: '#ff6384',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4
    },
    {
      label: 'Freedom Class',
      data: [880, 900, 890, 880, 890, 910, 930],
      borderColor: '#008000',
      backgroundColor: 'rgba(0, 128, 0, 0.2)',
      tension: 0.4
    },
    {
      label: 'Voyager Class',
      data: [870, 890, 880, 870, 880, 900, 920],
      borderColor: '#4bc0c0',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4
    },
    {
      label: 'Radiance Class',
      data: [800, 820, 810, 800, 810, 830, 850],
      borderColor: '#ffa500',
      backgroundColor: 'rgba(255, 165, 0, 0.2)',
      tension: 0.4
    },
    {
      label: 'Vision Class',
      data: [750, 770, 760, 750, 760, 780, 800],
      borderColor: '#800080',
      backgroundColor: 'rgba(128, 0, 128, 0.2)',
      tension: 0.4
    },
    {
      label: 'Icon Class',
      data: [1200, 1230, 1250, 1270, 1300, 1320, 1350],
      borderColor: '#ff1493',
      backgroundColor: 'rgba(255, 20, 147, 0.2)',
      tension: 0.4
    }
  ];

  const { language } = useLanguage();

  const [currency, setCurrency] = useState('USD');

  const exchangeRate = 1.35;
  const displayDatasets = datasets.map(ds => ({
    ...ds,
    data: currency === 'CAD'
      ? ds.data.map(val => +(val * exchangeRate).toFixed(2))
      : ds.data
  }));

  const data = { labels, datasets: displayDatasets };

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 5,
        backgroundColor: '#fff',
      },
      line: {
        borderWidth: 2,
      }
    },
    plugins: {
      title: {
        display: true,
        text: translations.homepage.chartTitleMain(currency, language),
        color: '#fff',
        font: {
          size: 18
        }
      },
      legend: {
        labels: {
          color: '#fff'
        }
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        display: false, // Prevents showing numbers on the chart
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#fff'
        },
        grid: {
          color: '#444'
        }
      },
      y: {
        title: {
          display: true,
          text: translations.homepage.yAxisTitle(currency, language),
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        },
        grid: {
          color: '#444'
        }
      }
    }
  };

  const [selectedClass, setSelectedClass] = useState(null);

  const handleRowClick = (className) => {
    setSelectedClass(className === selectedClass ? null : className);
  };

  const selectedData = displayDatasets.find(d => d.label === selectedClass);

  const averagePrice = selectedData ? (selectedData.data.reduce((a,b) => a+b, 0) / selectedData.data.length).toFixed(2) : null;
  const minPrice = selectedData ? Math.min(...selectedData.data) : null;
  const maxPrice = selectedData ? Math.max(...selectedData.data) : null;

  // Translations for table header and details section
  const shipClassHeader =
    language === 'fr' ? 'Classe de navire' : 'Ship Class';

  const detailsHeader = selectedClass
    ? language === 'fr'
      ? `Détails de la classe ${selectedClass}`
      : `${selectedClass} Details`
    : '';

  const shipsLabel = language === 'fr' ? 'Navires :' : 'Ships:';
  const avgPriceLabel = language === 'fr' ? 'Prix moyen :' : 'Average Price:';
  const minPriceLabel = language === 'fr' ? 'Prix minimum :' : 'Minimum Price:';
  const maxPriceLabel = language === 'fr' ? 'Prix maximum :' : 'Maximum Price:';

  return (
    <Container className="prices-container">
      <Row>
        <Col md={3} className="table-col">
          <div className="intro-text">
            <h2 className="intro-title">
              {language === 'fr'
                ? "Explorez les prix de Royal Caribbean"
                : "Explore Royal Caribbean's Pricing"}
            </h2>
            <p className="intro-text-body">
              {language === 'fr'
                ? "Royal Caribbean propose une grande variété de navires, chacun répondant à des goûts, des destinations et des budgets différents. Ce graphique explore l'évolution des prix moyens par classe de navire au fil des années."
                : "Royal Caribbean offers a wide variety of ships, each catering to different tastes, destinations, and budgets. This chart explores how the average prices for each class of ship have evolved over the years."}
            </p>
          </div>
          <div className="table-wrapper">
            <table className="ship-classes-table">
              <thead>
                <tr className="table-head">
                  <th>{shipClassHeader}</th>
                </tr>
              </thead>
              <tbody>
                {datasets.map(({ label }) => (
                  <tr
                    key={label}
                    className={`table-row${label === selectedClass ? ' selected' : ''}`}
                    onClick={() => handleRowClick(label)}
                  >
                    <td className="table-cell">{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
        <Col md={8} className="graph-col">
          <div className="currency-toggle">
            <button
              className={currency === 'USD' ? 'active' : ''}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
            <button
              className={currency === 'CAD' ? 'active' : ''}
              onClick={() => setCurrency('CAD')}
            >
              CAD
            </button>
          </div>
          <Line data={data} options={options} />
          <div className="selected-class-details">
            {selectedClass ? (
              <>
                <h3>{detailsHeader}</h3>
                <p>
                  <strong>{shipsLabel}</strong> {shipDetails[selectedClass]?.ships.join(', ')}
                </p>
                <p>
                  <strong>{avgPriceLabel}</strong> {currency === 'USD' ? 'USD$' : 'CAD$'}{averagePrice}
                </p>
                <p>
                  <strong>{minPriceLabel}</strong> {currency === 'USD' ? 'USD$' : 'CAD$'}{minPrice}
                </p>
                <p>
                  <strong>{maxPriceLabel}</strong> {currency === 'USD' ? 'USD$' : 'CAD$'}{maxPrice}
                </p>
              </>
            ) : (
              <p className="placeholder-text">
                {language === 'fr'
                  ? 'Veuillez sélectionner une classe de navire pour afficher les détails.'
                  : 'Please select a ship class to view details.'}
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Prices;