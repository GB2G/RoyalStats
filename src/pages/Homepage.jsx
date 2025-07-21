import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Doughnut } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Modal, Form, Badge, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import "./Homepage.css";

import iconImage from '../assets/icon-of-the-seas.jpg'
import { useLanguage, translations } from '../components/LanguageContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

const FleetComparison = () => {
  const { language } = useLanguage();

  // Combined mock price data for multiple ships
  const [priceData, setPriceData] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const conversionRate = 1.35; // 1 USD = 1.35 CAD

  useEffect(() => {
    const shipsByClass = {
      Oasis: ['Allure of the Seas','Harmony of the Seas','Oasis of the Seas','Symphony of the Seas','Wonder of the Seas','Utopia of the Seas'],
      Quantum: ['Anthem of the Seas','Odyssey of the Seas','Ovation of the Seas','Quantum of the Seas','Spectrum of the Seas'],
      Freedom: ['Freedom of the Seas','Independence of the Seas','Liberty of the Seas'],
      Voyager: ['Adventure of the Seas','Explorer of the Seas','Mariner of the Seas','Navigator of the Seas','Voyager of the Seas'],
      Radiance: ['Brilliance of the Seas','Jewel of the Seas','Radiance of the Seas','Serenade of the Seas'],
      Vision: ['Enchantment of the Seas','Grandeur of the Seas','Rhapsody of the Seas','Vision of the Seas'],
      Sovereign: ['Monarch of the Seas','Sovereign of the Seas'],
      Legacy: ['Splendour of the Seas'],
      Icon: ['Legend of the Seas (TBD)','Icon of the Seas','Star of the Seas']
    };
    const dates = ['2024-01-01','2024-04-01','2024-07-01','2024-10-01','2025-01-01','2025-04-01','2025-07-18'];
    const basePrices = {
      'Allure of the Seas':1180,'Harmony of the Seas':1220,'Oasis of the Seas':1150,'Symphony of the Seas':1250,'Wonder of the Seas':1200,
      'Anthem of the Seas':1320,'Odyssey of the Seas':1280,'Ovation of the Seas':1290,'Quantum of the Seas':1300,'Spectrum of the Seas':1290,'Utopia of the Seas':1310,
      'Freedom of the Seas':1100,'Independence of the Seas':1080,'Liberty of the Seas':1085,
      'Adventure of the Seas':1020,'Explorer of the Seas':1030,'Mariner of the Seas':1050,'Navigator of the Seas':1040,'Voyager of the Seas':1050,
      'Brilliance of the Seas':940,'Jewel of the Seas':960,'Radiance of the Seas':950,'Serenade of the Seas':980,
      'Enchantment of the Seas':400,'Grandeur of the Seas':620,'Rhapsody of the Seas':510,'Vision of the Seas':680,
      'Monarch of the Seas':830,'Sovereign of the Seas':850,
      'Splendour of the Seas':780,
      'Icon of the Seas':1500,'Star of the Seas': 1500,
    };
    const currentPrices = {
      'Allure of the Seas':1580,'Harmony of the Seas':1620,'Oasis of the Seas':1663,'Symphony of the Seas':1435,'Wonder of the Seas':1743,
      'Anthem of the Seas':2025,'Odyssey of the Seas':1980,'Ovation of the Seas':1995,'Quantum of the Seas':2008,'Spectrum of the Seas':1995,'Utopia of the Seas':2015,
      'Freedom of the Seas':2308,'Independence of the Seas':2200,'Liberty of the Seas':2225,
      'Adventure of the Seas':1590,'Explorer of the Seas':1600,'Mariner of the Seas':1580,'Navigator of the Seas':1590,'Voyager of the Seas':1672,
      'Brilliance of the Seas':870,'Jewel of the Seas':880,'Radiance of the Seas':865,'Serenade of the Seas':890,
      'Enchantment of the Seas':546,'Grandeur of the Seas':560,'Rhapsody of the Seas':570,'Vision of the Seas':540,
      'Monarch of the Seas':1050,'Sovereign of the Seas':1100,
      'Splendour of the Seas':1000,
      'Icon of the Seas':1750, 'Star of the Seas': 2100
    };
    
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const mock = Object.entries(shipsByClass).flatMap(([cls, shipList]) =>
      shipList.flatMap(ship =>
        dates.map((date, idx) => ({
          class: cls,
          ship,
          date,
          price: idx === dates.length-1 && currentPrices[ship]
            ? currentPrices[ship]
            : basePrices[ship] + getRandomInt(-200, 400)
        }))
      )
    );
    setPriceData(mock);
    setClasses(Object.keys(shipsByClass));
  }, []);

  // Extract sorted unique dates and ship names
  const dates = Array.from(new Set(priceData.map(d => d.date))).sort();
  const ships = Array.from(new Set(priceData.map(d => d.ship)));

  // High-contrast palette for unique class colors
  const colors = [
    '#1f77b4', // blue
    '#ff7f0e', // orange
    '#2ca02c', // green
    '#d62728', // red
    '#9467bd', // purple
    '#8c564b', // brown
    '#e377c2', // pink
    '#7f7f7f', // gray
    '#17becf'  // cyan
  ];

  // Build datasets: if no class selected, show average price per class
  let datasets;
  if (selectedClasses.length === 0) {
    // show average per class when no filter
    datasets = classes.map((cls, idx) => {
      const classSeries = dates.map(date => {
        const entries = priceData.filter(d => d.class === cls && d.date === date);
        const avgUsd = entries.reduce((sum, e) => sum + e.price, 0) / entries.length;
        return currency === 'CAD'
          ? Math.round(avgUsd * conversionRate)
          : Math.round(avgUsd);
      });
      return { label: translations.ships.classes[cls]?.[language] || cls, data: classSeries, borderColor: colors[idx % colors.length], fill: false, pointRadius: 5 };
    });
  } else {
    // show individual ships for selected classes
    const shipsInClasses = Array.from(new Set(
      priceData
        .filter(d => selectedClasses.includes(d.class))
        .map(d => d.ship)
    ));
    datasets = shipsInClasses.map((ship, idx) => {
      const shipSeries = dates.map(date => {
        const entry = priceData.find(d => d.ship === ship && d.date === date);
        const usd = entry ? entry.price : null;
        return currency === 'CAD' ? Math.round(usd * conversionRate) : usd;
      });
      return { label: translations.ships.names[ship]?.[language] || ship, data: shipSeries, borderColor: colors[idx % colors.length], fill: false, pointRadius: 5 };
    });
  }

  const chartData = { labels: dates, datasets };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: [
          translations.homepage.chartTitleMain(currency, language),
          translations.homepage.chartTitleSub(selectedClasses.length > 0, language)
        ],
        padding: { bottom: 20 },
        color: '#fff',
        font: {
          size: 15,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: context => `● ${context.dataset.label}`
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          padding: 15
        },
      },
      datalabels: {
        display: false
      },

      padding: 20
    },
    layout: {
      padding: {
        top: 20
      }
    },
    scales: {
      x: {
        ticks: {
          padding: 20,
          color: '#fff'
        }
      },
      y: {
        min: 0,
        max: 3500,
        title: {
          display: true,
          text: translations.homepage.yAxisTitle(currency, language),
          color: '#fff',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 500,
          callback: value => `${value} $`,
          color: '#fff',
        }
      }
    }
  };

  // Compute ship counts per class for donut chart
  const shipCounts = classes.map(c => {
    const uniqueShips = new Set(priceData.filter(d => d.class === c).map(d => d.ship));
    return uniqueShips.size;
  });

  const donutData = {
    labels: classes.map(c => translations.ships.classes[c]?.[language] || c),
    datasets: [{
      data: shipCounts,
      backgroundColor: colors.slice(0, classes.length),
    }]
  };

  const donutOptions = {
  plugins: {
    title: {
      display: true,
      text: translations.homepage.donutTitle[language],
      padding: {
        top:20,
        bottom: 10
      },
      color: '#fff',
      font: {
        size: 20,
        weight: 'bold'
      }
    },
    legend: {
      position: 'top',

      labels: {
        color: '#fff',
        padding: 25
        
        
      }
    }

  },
  
  maintainAspectRatio: false,
  responsive: true,
};

  return (
    <>
      <div className="hero-container">
          <img
            src={iconImage}
            className="hero-background-img"
            alt="Store"
          />
          <div className="hero-text-overlay">
            <h1>{translations.homepage.title[language]}</h1>
            <p>{translations.homepage.subtitle[language]}</p>
            <div className="hero-buttons">
              <Link to="/prices/:language">{translations.homepage.checkPrices[language]}</Link>
              <Link to="/fleet/:language">{translations.homepage.learnFleet[language]}</Link>
            </div>
          </div>
        </div>
      <Container fluid className="fleet-comparison py-4">
        <h2 className="comparison-title">{translations.homepage.fleetTitle[language]}</h2>
        <Modal backdropClassName="modal-overlay" dialogClassName="custom-modal-dialog" show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title>{translations.homepage.modalTitle[language]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-grid">
              {classes.map(c => (
                <button
                  key={c}
                  className={`btn btn-light ${selectedClasses.includes(c) ? 'selected' : ''}`}
                  onClick={() => {
                    if (selectedClasses.includes(c)) {
                      setSelectedClasses(selectedClasses.filter(x => x !== c));
                    } else {
                      setSelectedClasses([...selectedClasses, c]);
                    }
                  }}
                >
                  {translations.ships.classes[c]?.[language] || c}
                </button>
              ))}
            </div>
          </Modal.Body>
        </Modal>
        <Row className="charts gy-4">
          <Col md={5} >
            <Card >
              <Card.Body className="chart-container">
                <Line data={chartData} options={options} style={{height: '600px'}} />
                <div className="mt-2">
                  {selectedClasses.map(cls => (
                    <Badge
                      bg="secondary"
                      key={cls}
                      pill
                      className="me-1"
                    >
                      {translations.ships.classes[cls]?.[language] || cls} <span style={{cursor:'pointer'}} onClick={() => setSelectedClasses(selectedClasses.filter(x=>x!==cls))}>×</span>
                    </Badge>
                  ))}
                </div>
                <div className="chart-controls d-flex justify-content-between mb-2">
                  <Button className="filter-button" variant="outline-secondary" onClick={() => setShowModal(true)}>{translations.homepage.filterButton[language]}</Button>
                  <Button className="remove-filter" variant="outline-secondary" onClick={() => setSelectedClasses([])}>{translations.homepage.removeFilterButton[language]}</Button>
                  <Form.Select className="currency-container" size="sm" value={currency} onChange={e => setCurrency(e.target.value)} style={{width: '100px'}}>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </Form.Select>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card>
              <Card.Body className="chart-container">
                <Doughnut data={donutData} options={donutOptions} style={{height: '400px'}} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FleetComparison;
